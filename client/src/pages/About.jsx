import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function About() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="bg-gray-900 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">About Us</h1>

        <p className="text-lg leading-relaxed mb-6">
          Welcome to our website! We are a team of passionate individuals
          dedicated to providing you with the best service possible. Our mission
          is to empower and inspire others through innovation and creativity.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Our team believes in building meaningful relationships with our
          clients and ensuring every project exceeds expectations. With a focus
          on integrity, quality, and sustainability, we strive to make a
          positive impact in everything we do.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Values</h2>
        <ul className="list-inside list-disc">
          <li>
            Innovation: We embrace new ideas and strive to lead in our industry.
          </li>
          <li>Integrity: We always act with honesty and fairness.</li>
          <li>
            Excellence: We maintain high standards and deliver the best results.
          </li>
          <li>
            Sustainability: We are committed to eco-friendly practices and
            sustainability.
          </li>
        </ul>
        <div className="text-center mt-8">
          <Link
            to={`mailto:${currentUser?.data?.email || 'gautammarkande71@gmail.com'}?subject=Regarding Contact to The landloard&body=${`Hello, I am interested in your property. Please contact me at ${currentUser?.data.email} || gautammarkande71@gmail.com`}`}
            className="text-indigo-500 hover:text-indigo-600 font-semibold"
          >
            Get in touch with us to start your real estate journey!
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;
