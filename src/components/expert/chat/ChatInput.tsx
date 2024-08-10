// frontend\src\components\expert\chat\ChatInput.tsx

import { useRef, useState } from "react";
import { useSendMessageMutation, useUploadFileMutation } from "../../../slices/api/chatApiSlice";
import { ExpertInfo } from "../../../slices/authSlice";
import { IConversation } from "../../../types/domain";
import useSocket from "../../../hooks/useSocket";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile, BsPaperclip, BsMic, BsStopFill, BsSend } from "react-icons/bs";
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
      console.log('message in frontend: ', message)
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await uploadFile(formData).unwrap();
        if (fileType === 'image') {
          console.log('image response.fileName: ', response.fileName)
          message.imageName = response.fileName;
        } else if (fileType === 'video') {
          console.log('video response.fileName: ', response.fileName)
          message.videoName = response.fileName;
        } else if (fileType === 'audio') {
          console.log('audio response.fileName: ', response.fileName)
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
    // frontend\src\components\expert\chat\ChatInput.tsx
    <div className="bg-white border-t p-3">
      <div className="flex items-center bg-gray-100 rounded-full p-2">
        <div className="relative mr-2">
          <button type="button"
            className="text-gray-500 hover:text-indigo-600 transition-colors"
            onClick={() => setShowEmojiPicker((val) => !val)}
            title="Toggle Emoji Picker"
          >
            <BsEmojiSmile size={20} />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="file"
          name="file"
          title="select a file"
        />
        <label htmlFor="file" className="mr-2 text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">
          <BsPaperclip size={20} />
        </label>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`mr-2 ${isRecording ? 'text-red-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}
        >
          {isRecording ? <BsStopFill size={20} /> : <BsMic size={20} />}
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
          onChange={(e) => setChatText(e.target.value)}
          value={chatText}
        />

        <button
          onClick={sendChat}
          className="ml-2 text-white bg-indigo-600 rounded-full p-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!chatText.trim() && !selectedFile}
        >
          {isUploading ? <Spinner /> : <BsSend size={20} />}
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-2 text-sm">{error}</div>
      )}
      {selectedFile && (
        <div className="mt-1 text-sm text-gray-600">
          File selected: {selectedFile.name}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
