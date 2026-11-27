interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function FormSelect({ label, id, children, ...rest }: Props) {
  const fieldId = id ?? rest.name;
  return (
    <div className="min-w-0">
      <label htmlFor={fieldId} className="mb-0.5 block truncate text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={fieldId}
        className="block h-[34px] w-full min-w-0 max-w-full rounded-xl border border-slate-300 bg-white px-2 text-sm text-slate-900 outline-none focus:border-slate-600"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}
