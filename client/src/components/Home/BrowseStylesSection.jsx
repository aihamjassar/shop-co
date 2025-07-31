import casual from "../../assets/casual.png";
import party from "../../assets/party.png";
import formal from "../../assets/formal.png";
import gym from "../../assets/gym.png";
import { Link } from "react-router-dom";

const styles = [
  { name: "casual", image: casual, link: "casual" },
  { name: "formal", image: formal, link: "formal" },
  { name: "party", image: party, link: "party" },
  { name: "gym", image: gym, link: "gym" },
];

export const BrowseStylesSection = () => {
  return (
    <div>
      <div className="container mx-auto px-5 md:px-8 py-15">
        <div className="py-15 bg-[#F0F0F0] rounded-2xl overflow-hidden">
          <h2 className="text-4xl font-extrabold -tracking-wider text-center mb-10 uppercase">
            browse by dress style
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-3 lg:px-6">
            {styles.map((style) => (
              <CardStyle
                key={style.name}
                name={style.name}
                image={style.image}
                link={style.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardStyle = ({ name, image, link }) => {
  return (
    <Link
      to={`/products/${link}`}
      className="relative w-full rounded-2xl overflow-hidden bg-white transition-transform duration-300 hover:scale-110"
    >
      <h3 className="absolute top-5 left-5 text-2xl font-bold">{name}</h3>
      <img src={image} alt={name} className="w-full h-64 object-cover" />
    </Link>
  );
};
