interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({ label, error, id, ...rest }: Props) {
  const fieldId = id ?? rest.name;
  return (
    <div className="min-w-0">
      <label htmlFor={fieldId} className="mb-0.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`block w-full min-w-0 max-w-full rounded-lg border bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-400" : "border-slate-300"
        }`}
        {...rest}
      />
      {error && (
        <p id={`${fieldId}-error`} className="mt-0.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
