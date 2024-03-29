/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  image?: string;
}

export default function Card(props: CardProps) {
  const CardImage = () => {
    const defaultImgSrc = "https://via.placeholder.com/300";
    const imgClass = "h-64 w-full object-cover object-center";
    if (!props.image) {
      return <img src={defaultImgSrc} alt={props.title} className={imgClass} />;
    }
    if (props.image.startsWith("http")) {
      return <img className={imgClass} src={props.image} alt={props.title} />;
    }
    return (
      <Image
        className="h-64 w-full object-cover object-center"
        src={props.image}
        alt={props.title}
        width={300}
        height={300}
      />
    );
  };
  return (
    <div className="w-[350px] overflow-hidden rounded bg-slate-200 text-black shadow-lg">
      <CardImage />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-black">{props.title}</div>
        <p className="text-base text-gray-700">{props.description}</p>
      </div>
      {/* <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #photography
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #winter
        </span>
      </div> */}
    </div>
  );
}
