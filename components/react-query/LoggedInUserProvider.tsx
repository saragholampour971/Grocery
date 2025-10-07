"use client"
import {PropsWithChildren, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import useUserStore from "@/lib/store/userStore";
import {authService} from "@/service/authService";
import {ApiResponse} from "../../lib/globalTypes";
import {User} from "@/app/api/(auth)/type";

export default function LoggedInUserProvider(props: PropsWithChildren) {
  const setUser = useUserStore(st => st.setUser)
  console.log('LoggedInUserProvider')
  const {data} = useQuery<ApiResponse<User>>({
    queryKey: ['user'],
    queryFn: authService.me,
  });
  useEffect(() => {
    console.log(data, '  LoggedInUserProvider - data')
    console.log('set user to store', data)
    if (data) {

      // setUser(data.data?.)
    }
  }, [data, setUser]);


  return <>{props.children}</>
}
