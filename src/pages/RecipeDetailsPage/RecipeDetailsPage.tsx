import { Link, useLocation } from "react-router-dom";
import { IRecipe } from "@/common/interfaces/recipe.interfaces.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import styles from "@/components/Cards/RecipeCard/index.module.css";
import { ResizableWrapper } from "@/components/All/ResizableWrapper/ResizableWrapper.tsx";
import { IUser } from "@/common/interfaces/users.interfaces.ts";
import { apiUsers } from "@/api/apiUsers.ts";
import { useQuery } from "@tanstack/react-query";

const RecipeDetailsPage = () => {
  const { recipe: item } = useLocation().state as { recipe: IRecipe };

  const { data } = useQuery<IUser>({
    queryKey: ["user", item?.userId],
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey;
      return await apiUsers.userById(userId as string);
    },
    staleTime: Infinity,
  });

  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      {item && (
        <ResizableWrapper>
          <Card className={"p-5"}>
            <CardHeader>
              <CardTitle>
                {item.id}: {item.name} <br />
              </CardTitle>
              <CardDescription>UserId: {item.userId}</CardDescription>
              <CardDescription>Tags: {item.tags}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.cuisine}</p>
            </CardContent>
            <CardFooter>
              <p className={styles.textSmall}>Views: {item.instructions}</p>
            </CardFooter>
            <Link
              to={`/users/${item.userId}`}
              className={"text-blue-500 hover:text-blue-700 underline ml-5"}
              state={{ user: data || {} }}
            >
              Author
            </Link>
          </Card>
        </ResizableWrapper>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
