import { useLocation } from "react-router-dom";
import { IUser } from "@/common/interfaces/users.interfaces.ts";
import styles from "@/components/Cards/UserCard/index.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { IRecipeResponse } from "@/common/interfaces/recipe.interfaces.ts";
import useApiRecipes from "@/api/useApiRecipes.ts";
import { RecipeCard } from "@/components/Cards/RecipeCard/RecipeCard.tsx";

const UserDetailsPage = () => {
  const { user } = useLocation().state as { user: IUser };
  const { apiRecipesService: apiRecipes } = useApiRecipes();
  const handleClick = () => {};

  const { isFetching, data } = useFetch<IRecipeResponse>({
    cb: apiRecipes.recipes,
    queryKey: "recipes",
  });

  const filtered = data?.recipes.filter(item => item.userId === user.id);

  return (
    <div className="pl-[400px] pt-[70px] pb-5 pr-5 w-screen h-[85%] flex gap-2 flex-wrap justify-items-start">
      <Card
        className={clsx(styles.card, "fixed top-[80px] left-[60px] w-auto h-[85%]")}
        onClick={handleClick}
      >
        <div className="m-4 p-2 text-left">
          <Avatar>
            <AvatarImage src={user.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <CardHeader>
          <CardTitle>
            {user.id}: {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription>Age: {user.age}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{user.phone}</p>
          <p>{user.role}</p>
        </CardContent>
        <CardFooter>
          <p className="text-small">{user.email}</p>
        </CardFooter>
      </Card>
      {isFetching && <div>Fetching...</div>}
      {data &&
        filtered &&
        filtered.map(item => {
          return <RecipeCard key={item.id} item={item} />;
        })}
    </div>
  );
};

export default UserDetailsPage;
