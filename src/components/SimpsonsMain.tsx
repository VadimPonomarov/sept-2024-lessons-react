import { simpsons } from "@/assets/array.ts";
import { IFamily } from "@/assets/interfaces.ts";
import { SimpsonsCard } from "./SimpsonsCard";

const SimpsonsMain = () => {
  const family: IFamily[] = simpsons;
  return (
    <div className={"flex flex-wrap justify-evenly"}>
      {family &&
        family.map((item, index) => <SimpsonsCard key={index} item={item} />)}
    </div>
  );
};

export default SimpsonsMain;
