export default function InlineError({ message }: { message?: string; }) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-[6rem] sm:text-[7rem] font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Error
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-md leading-relaxed">
                {message || "Something went wrong. Please try again."}
            </p>
        </div>
    );
}
