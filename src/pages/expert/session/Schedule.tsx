// frontend/src/pages/expert/session/Schedule.tsx

import { useState } from 'react';
import ScheduleComponent from '../../../components/expert/ScheduleComponent';
import { useGetSchedulesQuery, useAddScheduleMutation } from '../../../slices/api/expertApiSlice';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/admin/Modal';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { addScheduleSchema } from '../../../validation/yupValidation';
import { MyError } from '../../../validation/validationTypes';

export default function Schedule() {
  const { data: schedules, error, isLoading } = useGetSchedulesQuery();
  const [addSchedule] = useAddScheduleMutation();
  // const [editSchedule] = useEditScheduleMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formikAdd = useFormik({
    initialValues: {
      time: '',
    },
    validationSchema: addScheduleSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form', values);
        await addSchedule(values).unwrap();
        toast.success('Schedule added successfully');
        resetForm();
        setIsAddModalOpen(false);
      } catch (error) {
        console.error('Failed to add schedule', error);
        toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
      }
    },
  });

  const handleAddModalClose = () => {
    formikAdd.resetForm();
    setIsAddModalOpen(false);
  };

  const handleCancel = (_id: string) => {
    // Handle cancel action
    console.log('Cancelled', _id);
  };

  const handleEdit = (_id: string) => {
    // Handle edit action
    console.log('Edited', _id);
  };

  if (isLoading) return <Spinner />;
  // if (error) return <div>Error loading schedules</div>;

  return (
    <>
      <span className="font-bold text-4xl">Schedule</span>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => setIsAddModalOpen(true)}>
        Add Schedule
      </button>
      {schedules?.map((schedule) => (
        <ScheduleComponent
          key={schedule._id}
          time={schedule.time}
          onCancel={() => handleCancel(schedule._id)}
          onEdit={() => handleEdit(schedule._id)}
        />
      ))}

      <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
        <h2 className="text-2xl mb-4">Add Schedule</h2>
        <form onSubmit={formikAdd.handleSubmit}>
        <label htmlFor="time" className="block text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            className="border p-2 w-full mb-4"
            name="time"
            value={formikAdd.values.time}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter time" // Optionally add placeholder
          />
          {formikAdd.touched.time && formikAdd.errors.time ? (
            <div className="text-red-500">{formikAdd.errors.time}</div>
          ) : null}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
}
{/* <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
        <h2 className="text-2xl mb-4">Add Schedule</h2>
        <form onSubmit={formikAdd.handleSubmit}>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            placeholder="Time"
            name="time"
            value={formikAdd.values.time}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
          />
          {formikAdd.touched.time && formikAdd.errors.time ? (
            <div className="text-red-500">{formikAdd.errors.time}</div>
          ) : null}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </Modal> */}


// // frontend\src\pages\expert\session\Schedule.tsx

// import { useState } from "react";
// import Modal from "../../../components/expert/Modal";
// import ScheduleComponent from "../../../components/expert/ScheduleComponent";
// import { useAddScheduleMutation, useEditScheduleMutation, useGetSchedulesQuery } from "../../../slices/api/expertApiSlice";

// export default function Schedule() {
//   const { data: schedules, error, isLoading } = useGetSchedulesQuery();
//   const [addSchedule] = useAddScheduleMutation();
//   const [editSchedule] = useEditScheduleMutation();
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);



//   const handleCancel = () => {
//     // Handle cancel action
//     console.log("Cancelled");
//   };

//   const handleEdit = () => {
//     // Handle edit action
//     console.log("Edited");
//   };

//   const schedules = [
//     { time: '06:00PM' },
//     { time: '07:00PM' },
//     { time: '08:00PM' },
//     { time: '09:00PM' },
//   ];

//   return (
//     <>
//       <span className="font-bold text-4xl">Schedule</span>
//       {schedules.map((schedule, index) => (
//         <ScheduleComponent
//           key={index}
//           time={schedule.time}
//           onCancel={handleCancel}
//           onEdit={handleEdit}
//         />
//       ))}

//       <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
//         <h2 className="text-2xl mb-4">Add Schedule</h2>
//         <form onSubmit={formikAdd.handleSubmit}>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             placeholder="Time"
//             name="time"
//             value={formikAdd.values.time}
//             onChange={formikAdd.handleChange}
//             onBlur={formikAdd.handleBlur}
//           />
//           {formikAdd.touched.time && formikAdd.errors.time ? (
//             <div className="text-red-500">{formikAdd.errors.time}</div>
//           ) : null}
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//             Add
//           </button>
//         </form>
//       </Modal>
//     </>
//   );
// }
