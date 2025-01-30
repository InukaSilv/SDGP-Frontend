import Navbar from "../components/navbar/navbar";

function HomePage() {
  return (
    <>
      <section className="h-screen bg-cover bg-center bg-no-repeat bg-[url('src/assets/main-background.jpeg')]">
        <Navbar />
        <div className="h-full w-full flex flex-col items-center justify-center bg-black/50 text-center px-4">
          <h1 className="text-white text-5xl font-bold mb-4">
            Welcome to RiVVE
          </h1>
          <h2 className="text-white text-3xl font-medium max-w-3xl">
            Your hostel search made easy - find trusted stays for every journey
          </h2>
        </div>
      </section>
    </>
  );
}

export default HomePage;
