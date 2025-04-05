import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function AboutContact() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to RealEstatePro
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Real estate is one of the most significant investments you can make,
          whether you're buying your first home, renting an apartment, or
          investing in commercial properties. At RealEstatePro, we offer a wide
          range of properties to meet all your needs.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-inside list-disc pl-5 text-lg text-gray-700">
          <li>Expert advice from seasoned real estate agents</li>
          <li>A wide variety of properties to suit different budgets</li>
          <li>Personalized service to help you find the perfect home</li>
          <li>Access to exclusive listings and market insights</li>
          <li>Secure, reliable, and efficient transactions</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          How We Can Help You
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Whether you're looking to buy, rent, or sell a property, our team at
          RealEstatePro is here to guide you through every step of the process.
          We understand the complexities of the real estate market and strive to
          make your experience as smooth as possible.
        </p>

        <div className="text-center mt-8">
          <Link
            to={`mailto:${currentUser?.data?.email || 'gautammarkande71@gmail.com'}?subject=Regarding Contact to The landloard&body=${`Hello, I am interested in your property. Please contact me at ${currentUser?.data?.email} || gautammarkande71@gmail.com`}`}
            className="text-indigo-500 hover:text-indigo-600 font-semibold"
          >
            Get in touch with us to start your real estate journey!
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutContact;
