export default function ToastItem({ message }: { message: string }) {
  return (
    <div className="w-fit max-w-full rounded-3xl bg-black px-5 py-2.5 text-center text-sm text-white">
      {message}
    </div>
  );
}
