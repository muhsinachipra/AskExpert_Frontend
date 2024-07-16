// frontend\src\pages\expert\session\Schedule.tsx

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
import { RRule } from 'rrule';
import { formatTimeTo12Hour } from '../../../lib/utils';
const MySwal = withReactContent(Swal);

export default function Schedule() {
  const { data, error, isLoading } = useGetSchedulesQuery();
  const schedules = useMemo(() => data?.data, [data]);
  const [addSchedule] = useAddScheduleMutation();
  const [cancelSchedule] = useCancelScheduleMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formikAdd = useFormik({
    initialValues: {
      date: '',
      startTime: '',
      endTime: '',
      price: 0,
      recurrence: '',
    },
    validationSchema: addScheduleSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('values onSubmit : ', values);

      const startDateTime = new Date(`${values.date}T${values.startTime}`)
      const endDateTime = new Date(`${values.date}T${values.endTime}`)
      const untilDateTime = new Date(`${values.recurrence}`)
      const dtstartLocalTime = new Date(startDateTime.getTime() - (startDateTime.getTimezoneOffset() * 60000));
      const dtendLocalTime = new Date(endDateTime.getTime() - (endDateTime.getTimezoneOffset() * 60000));
      const untilLocalTime = new Date(untilDateTime.getTime() - (untilDateTime.getTimezoneOffset() * 60000));
      untilLocalTime.setDate(untilLocalTime.getDate() + 1);

      try {
        const rruleString = new RRule({
          freq: RRule.DAILY, // Change this as needed
          dtstart: dtstartLocalTime,
          // dtend: dtendLocalTime,
          until: untilLocalTime,
        }).toString();
        console.log('rruleString; ', rruleString)

        const scheduleData = {
          ...values,
          rrule: rruleString,
          dtstart: dtstartLocalTime.toISOString(),
          dtend: dtendLocalTime.toISOString(),
        };

        await addSchedule(scheduleData).unwrap();
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
          startTime={formatTimeTo12Hour(schedule.startTime)}
          endTime={formatTimeTo12Hour(schedule.endTime)}
          price={schedule.price}
          onCancel={() => handleCancel(schedule._id)}
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


          <label htmlFor="startTime" className="block text-gray-700">Start Time</label>
          <input
            type="time"
            id="startTime"
            className="border p-2 w-full mb-4"
            name="startTime"
            value={formikAdd.values.startTime}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter startTime"
          />
          {formikAdd.touched.startTime && formikAdd.errors.startTime ? (
            <div className="text-red-500">{formikAdd.errors.startTime}</div>
          ) : null}


          <label htmlFor="endTime" className="block text-gray-700">End Time</label>
          <input
            type="time"
            id="endTime"
            className="border p-2 w-full mb-4"
            name="endTime"
            value={formikAdd.values.endTime}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter endTime"
          />
          {formikAdd.touched.endTime && formikAdd.errors.endTime ? (
            <div className="text-red-500">{formikAdd.errors.endTime}</div>
          ) : null}

          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            className="border p-2 w-full mb-4"
            name="price"
            value={formikAdd.values.price}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter price"
          />
          {formikAdd.touched.price && formikAdd.errors.price ? (
            <div className="text-red-500">{formikAdd.errors.price}</div>
          ) : null}


          <label htmlFor="recurrence" className="block text-gray-700">Recurrence Until</label>
          <input
            type="date"
            id="recurrence"
            className="border p-2 w-full mb-4"
            name="recurrence"
            value={formikAdd.values.recurrence}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            placeholder="Enter recurrence end date"
          />
          {formikAdd.touched.recurrence && formikAdd.errors.recurrence ? (
            <div className="text-red-500">{formikAdd.errors.recurrence}</div>
          ) : null}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
}
