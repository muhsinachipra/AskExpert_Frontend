// frontend/src/pages/expert/session/Schedule.tsx

import { useMemo, useState } from 'react';
import ScheduleComponent from '../../../components/expert/ScheduleComponent';
import { useGetSchedulesQuery, useAddScheduleMutation, useCancelScheduleMutation } from '../../../slices/api/expertApiSlice';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/admin/Modal';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { addScheduleSchema } from '../../../validation/yupValidation';
import { MyError } from '../../../validation/validationTypes';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Schedule() {
  const { data, error, isLoading } = useGetSchedulesQuery();
  // const schedules = data?.data;
  const schedules = useMemo(() => data?.data, [data]);
  // console.log('schedule from Schedules.tsx : ', schedules)
  const [addSchedule] = useAddScheduleMutation();
  const [cancelSchedule] = useCancelScheduleMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formikAdd = useFormik({
    initialValues: {
      date: '',
      time: '',
    },
    validationSchema: addScheduleSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form values : ', values);
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

  const handleCancel = async (_id: string) => {
    // Handle cancel action
    console.log('Cancelled', _id);
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel!',
      cancelButtonText: 'No, Revert!',
    });

    if (result.isConfirmed) {
      try {
        await cancelSchedule(_id).unwrap();
        toast.success('Schedule cancelled successfully');
      } catch (error) {
        console.error('Failed to cancel schedule', error);
        toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading schedules</div>;

  return (
    <>
      <span className="font-bold text-4xl">Schedule</span>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => setIsAddModalOpen(true)}>
        Add Schedule
      </button>
      {schedules?.length === 0 && (
        <p className="font-bold text-2xl text-gray-500 mt-4">No schedules found</p>
      )}
      {schedules?.map((schedule) => (
        <ScheduleComponent
          key={schedule._id}
          date={schedule.date}
          time={schedule.time}
          onCancel={() => handleCancel(schedule._id)}
        // onEdit={() => handleEdit(schedule._id)}
        />
      ))}
      <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
        <h2 className="text-2xl mb-4">Add Schedule</h2>
        <form onSubmit={formikAdd.handleSubmit}>
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            className="border p-2 w-full mb-4"
            name="date"
            value={formikAdd.values.date}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter date"
          />
          {formikAdd.touched.date && formikAdd.errors.date ? (
            <div className="text-red-500">{formikAdd.errors.date}</div>
          ) : null}

          <label htmlFor="time" className="block text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            className="border p-2 w-full mb-4"
            name="time"
            value={formikAdd.values.time}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter time"
          />
          {formikAdd.touched.time && formikAdd.errors.time ? (
            <div className="text-red-500">{formikAdd.errors.time}</div>
          ) : null}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </Modal>
      {/* <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
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
            placeholder="Enter time"
          />
          {formikAdd.touched.time && formikAdd.errors.time ? (
            <div className="text-red-500">{formikAdd.errors.time}</div>
          ) : null}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </Modal> */}
    </>
  );
}
