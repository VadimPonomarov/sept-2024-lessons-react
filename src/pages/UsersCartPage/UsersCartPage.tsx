import {FC, useEffect} from "react";
import {TestDrawerCard} from "@/components/DrawerCard/TestDrawerCard.tsx";
import {useParams} from "react-router-dom";

type IProps = object;

export const UsersCartPage: FC<IProps> = () => {
    const {userId} = useParams();
    useEffect(() => {
    }, [userId]);
    return <TestDrawerCard key={userId} userId={"" + userId!}/>;
};
