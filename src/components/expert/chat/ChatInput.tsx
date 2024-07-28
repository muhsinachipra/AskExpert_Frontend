// frontend\src\components\expert\chat\ChatInput.tsx

import { useRef, useState } from "react";
import { useSendMessageMutation, useUploadFileMutation } from "../../../slices/api/chatApiSlice";
import { ExpertInfo } from "../../../slices/authSlice";
import { IConversation } from "../../../types/domain";
import useSocket from "../../../hooks/useSocket";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin, BsMic, BsStopFill } from "react-icons/bs";
import Spinner from "../../Spinner";

const MAX_FILE_SIZE_MB = 8; // Maximum file size in MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert to bytes

interface ChatInputProps {
    expertInfo: ExpertInfo | null;
    currentConversation: IConversation;
}

const ChatInput = ({ expertInfo, currentConversation }: ChatInputProps) => {
    const socket = useSocket();
    const [sendMessage] = useSendMessageMutation();
    const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
    const [chatText, setChatText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const sendChat = async () => {
        if (!expertInfo || !currentConversation._id) {
            console.error("User info or conversation ID is missing");
            return;
        }
        const receiverId = currentConversation.members.find((member) => member !== expertInfo._id);
        if (!receiverId) {
            console.error("Receiver ID not found");
            return;
        }

        try {
            const message = {
                conversationId: currentConversation._id,
                senderId: expertInfo._id,
                receiverId,
                text: chatText,
                imageName: '',
                videoName: '',
                audioName: '',
            };

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const response = await uploadFile(formData).unwrap();
                if (fileType === 'image') {
                    message.imageName = response.fileName;
                } else if (fileType === 'video') {
                    message.videoName = response.fileName;
                } else if (fileType === 'audio') {
                    message.audioName = response.fileName;
                }
                setSelectedFile(null);
            }

            // Send message through API
            await sendMessage(message).unwrap();

            // Emit message through socket
            socket?.emit("sendMessage", message);

            setChatText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleEmojiClick = (emojiObject: { emoji: string; }) => {
        const { emoji } = emojiObject;
        setChatText((prevText) => prevText + emoji);
        setShowEmojiPicker(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > MAX_FILE_SIZE_BYTES) {
                setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
                setSelectedFile(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'video/mp4', 'audio/mpeg', 'audio/wav'].includes(file.type)) {
                setError('Unsupported file format.');
                setSelectedFile(null);
                return;
            }
            setError(null);
            setSelectedFile(file);
            if (file.type.startsWith('image/')) {
                setFileType('image');
            } else if (file.type.startsWith('video/')) {
                setFileType('video');
            } else if (file.type.startsWith('audio/')) {
                setFileType('audio');
            }
        }
    };

    const startRecording = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Media devices not supported");
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (e) => {
                audioChunks.current.push(e.data);
            };
            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/mpeg' });
                audioChunks.current = [];
                setSelectedFile(new File([audioBlob], 'recording.mp3', { type: 'audio/mpeg' }));
                setFileType('audio');
            };
            mediaRecorder.current.start();
            setIsRecording(true);
        }).catch((err) => {
            console.error("Error accessing media devices", err);
        });
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
            // Stop all tracks on the media stream
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className="flex items-center">
            <div className="relative">
                <BsEmojiGrin
                    className="text-[24px] mr-3 text-[#9BA3AF]"
                    onClick={() => setShowEmojiPicker((val) => !val)}
                />
                {showEmojiPicker && (
                    <div className="absolute bottom-full mb-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 bg-zinc-200 rounded-lg focus:outline-none focus:border-indigo-600"
                onChange={(e) => setChatText(e.target.value)}
                value={chatText}
            />
            <input
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="file"
                name="file"
            />
            <label htmlFor="file" className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                {selectedFile ? selectedFile.name : "Upload Media"}
            </label>
            {error && (
                <div className="text-red-500 ml-3">{error}</div>
            )}
            <button
                onClick={isRecording ? stopRecording : startRecording}
                className="ml-3 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                {isRecording ? <BsStopFill /> : <BsMic />}
            </button>
            <button onClick={sendChat} className="ml-3 min-w-[70px] max-h-[50px] bg-indigo-600 text-white px-4 py-2 rounded-lg" disabled={!chatText.trim() && !selectedFile}>
                {isUploading ? <Spinner /> : "Send"}
            </button>
        </div>
    );
};

export default ChatInput;
