"use client";
export default function Error({error}) {
  const errorhandle= error
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl"></h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {errorhandle.message}
                  </p>
        <p className="mt-4 text-gray-500">
          La página que estás buscando no existe o ha sido movida.  {errorhandle.message}
        </p>
      </div>
    </div>
  );
}
