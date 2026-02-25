"use client";

import Link from "next/link";

export default function BuilderPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Work with data as JSON object
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <main className="min-h-screen bg-[#f3f3f5] text-[#2c2f5e]">
      {/* ============================= */}
      {/* Top Navigation Bar */}
      {/* ============================= */}
      <header className="h-14 bg-gradient-to-r from-[#3b3f7c] via-[#3a3f69] to-[#3a3a3a] flex items-center justify-between px-8 text-white">
        {/* Left logo */}
        <Link href="/" className="text-2xl tracking-wide font-heading">
          SOURCE
        </Link>

        {/* Right nav */}
        <nav className="flex items-center gap-12 text-xl tracking-[0.4em] uppercase font-heading">
          <Link href="/beacons">Beacons</Link>
          <Link href="/beacons/builder">Builder</Link>
          <Link href="/">Menu</Link>
        </nav>
      </header>

      {/* ============================= */}
      {/* Step Header Bar */}
      {/* ============================= */}
      <section className="px-10 pt-6">
        <div className="bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b] text-white px-6 py-3 shadow-lg flex items-center gap-6">
          {/* Step indicator */}
          <div className="flex items-center gap-4 font-heading tracking-[0.25em] uppercase">
            <span className="text-2xl">1</span>
            <span>Profile</span>
          </div>

          {/* Steps placeholder */}
          <div className="ml-auto flex gap-6 opacity-80">
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span className="font-bold">End</span>
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* Main Builder Card */}
      {/* ============================= */}
      <section className="px-10 pt-6">
        <form method="post" onSubmit={handleSubmit}>
        <div className="bg-[#efeff2] rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.2)] border border-[#d7d7dd] p-8 grid grid-cols-[220px_1fr_200px] gap-6 items-start">

          {/* ================================= */}
          {/* Photo Upload Placeholder */}
          {/* ================================= */}
          <div>
            <div className="text-sm font-serif mb-2 uppercase tracking-wide">
              Photo Upload
            </div>

            <div className="w-[180px] h-[180px] border border-[#cfcfd6] rounded-md flex items-center justify-center text-5xl text-gray-400 bg-white">
              +
            </div>
          </div>

          {/* ================================= */}
          {/* Center Form Fields */}
          {/* ================================= */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-serif uppercase tracking-wide">
                * Full Name - or Sobriquet
              </label>
              <input name="beaconName" className="w-full border border-[#cfcfd6] rounded-sm h-10 px-3 bg-white" />
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-serif uppercase tracking-wide">
                Title
              </label>
              <input name="beaconTitle" className="w-[70%] border border-[#cfcfd6] rounded-sm h-10 px-3 bg-white" />
            </div>

            {/* Description + Appearance */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-serif uppercase tracking-wide">
                  Description
                </label>
                <input name="beaconDescription" className="w-full border border-[#cfcfd6] rounded-sm h-10 px-3 bg-white" />
              </div>

              <div>
                <label className="text-sm font-serif uppercase tracking-wide">
                  Appearance
                </label>
                <input name="beaconAppearance" className="w-full border border-[#cfcfd6] rounded-sm h-10 px-3 bg-white" />
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* Right Pronouns Field */}
          {/* ================================= */}
          <div>
            <label className="text-sm font-serif uppercase tracking-wide">
              Pronouns
            </label>
            <input name="beaconPronouns" className="w-full border border-[#cfcfd6] rounded-sm h-10 px-3 bg-white" />
          </div>

          {/* ================================= */}
          {/* Submit Button */}
          {/* ================================= */}
          <div className="col-span-3 flex justify-end">
            <button type="submit" className="bg-white text-[#23244a] px-6 py-2 rounded-sm text-sm font-serif uppercase hover:ring-2 hover:ring-[#292F5E] hover:ring-inset transition">
              Save & Continue
            </button>
          </div>
        </div>
        </form>
      </section>
    </main>
  );
}