import { Link } from "react-router-dom";
import { dressStyles } from "../../constants/constants";


export const BrowseStylesSection = () => {
  return (
    <section
      id="browsesByStyle"
      className="container mx-auto px-5 md:px-8 py-15 scroll-mt-20"
    >
      <div className="py-15 bg-[#F0F0F0] rounded-2xl overflow-hidden">
        <h2 className="text-4xl font-extrabold -tracking-wider text-center mb-10 uppercase">
          browse by dress style
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-3 lg:px-6">
          {dressStyles.map((style) => {
            return (
              <CardStyle
                key={style.name}
                name={style.name}
                image={style.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CardStyle = ({ name, image }) => {
  return (
    <Link
      to={`/shop?dressStyles=${name}`}
      className="relative w-full rounded-2xl overflow-hidden bg-white transition-transform duration-300 hover:scale-110"
    >
      <h3 className="absolute top-5 left-5 text-2xl font-bold capitalize">
        {name}
      </h3>
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-full h-64 object-cover"
      />
    </Link>
  );
};
