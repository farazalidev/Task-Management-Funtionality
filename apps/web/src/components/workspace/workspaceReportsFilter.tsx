import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../input/InputField';
import Button from '../button/Button';
import { useQueryState } from "nuqs"
import { decodeFilterQuery } from '@/utils/decodeFilterQuery';
import { User } from '@/@types';

interface UserWrapper {
  _id: string;
  workspace: string;
  user: User;
}

interface ReportFormProps {
  users: UserWrapper[];
}

const ReportSchema = z.object({
  by_user: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export type ReportFormData = z.infer<typeof ReportSchema>;

const ReportForm: React.FC<ReportFormProps> = ({ users }) => {
  const [filter, setFilter] = useQueryState("filter")
  const filterQuery = decodeFilterQuery(filter || "");
  console.log(filterQuery);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      ...filterQuery,
      by_user:filterQuery.by_user === "undefined"?"all":filterQuery.by_user

    }

  });

  const onSubmit = (data: ReportFormData) => {

    const filter = encodeURIComponent(`all:${data.by_user === "all" ? true : false},by_user:${data.by_user ==="all"?undefined:data.by_user},from:${data.from},to:${data.to}`)
    setFilter(filter)

  }



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 bg-white rounded-md shadow-md sm:space-y-8 sm:p-6 lg:w-3/4 lg:mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl mb-4">Generate Report</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select User
        </label>
        <select
          {...register('by_user')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
        >
          <option value="all">All</option>
          {users.map(({ user }) => (
            <option key={user._id} value={user._id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <InputField
            type="date"
            {...register('from')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
          />
          {errors.from && <p className="text-red-600 mt-1">{errors.from.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <InputField
            type="date"
            {...register('to')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
          />
          {errors.to && <p className="text-red-600 mt-1">{errors.to.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        label="Generate Report"
        className="w-full bg-black hover:bg-gray-800 transition-colors py-2 text-white rounded-md"
      />
    </form>
  );
};

export default ReportForm;
