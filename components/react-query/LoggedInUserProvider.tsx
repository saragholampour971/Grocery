"use client"
import {PropsWithChildren, useEffect} from "react";
import {authService} from "@/store/authService";
import {useQuery} from "@tanstack/react-query";
import useUserStore from "@/store/store/userStore";

export default function LoggedInUserProvider(props: PropsWithChildren) {
  const setUser = useUserStore(st => st.setUser)
  const {data} = useQuery({
    queryKey: ['user'],
    queryFn: authService.me,
  });

  useEffect(() => {
    console.log('set user to store', data)
    if (data) {

      setUser(data)
    }
  }, [data, setUser]);


  return <>{props.children}</>
}
