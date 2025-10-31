import { jsx as _jsx } from "react/jsx-runtime";
import ExperienceCard from "../components/ExperienceCard";
import { experiences } from "../assets/experiences";
const Home = ({ search }) => {
    // Optionally, if you want Home to handle its own search too:
    // const [localSearch, setLocalSearch] = useState(search);
    const filtered = experiences.filter((exp) => exp.title.toLowerCase().includes(search.toLowerCase()) ||
        exp.location.toLowerCase().includes(search.toLowerCase()) ||
        exp.tag.toLowerCase().includes(search.toLowerCase()));
    return (_jsx("div", { className: "max-w-7xl mx-auto py-8 px-4", children: _jsx("div", { className: "flex flex-wrap -mx-3", children: filtered.length === 0 ? (_jsx("div", { className: "text-gray-500 p-8 w-full text-center", children: "No experiences found." })) : (filtered.map((exp) => (_jsx("div", { className: "w-full sm:w-1/2 lg:w-1/4 px-3 mb-6", children: _jsx(ExperienceCard, { exp: exp }) }, exp.id)))) }) }));
};
export default Home;
