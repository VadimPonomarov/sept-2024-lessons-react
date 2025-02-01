import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import useApiAuth from "@/api/useApiAuth.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/store/useApp.ts";
import { useEffectOnce } from "@/common/hooks/useEffectOnce.tsx";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";
import { FormFields } from "./index.interfaces";
import { schema } from "./index.schemas";

export const useLoginForm = () => {
  const { apiAuthService } = useApiAuth();
  const { currentUser } = useAppSelector(state => state.ini);
  const location = useLocation();
  const user = location.state?.user as IDummyAuth;
  const dispatch = useAppDispatch();

  const initialValues: IDummyAuth = {
    username: user?.username || "",
    password: user?.password || "",
    expiresInMins: user?.expiresInMins || 30,
  };
  const [formData, setFormData] = useState<IDummyAuth>(initialValues);

  const formFields: FormFields = {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
    expiresInMins: { label: "Expires In Minutes", type: "number" },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IDummyAuth>({
    resolver: joiResolver(schema),
    defaultValues: formData,
    mode: "all",
  });

  useEffectOnce(() => {
    if (user) {
      setFormData(initialValues);
      reset(initialValues);
    }
  });
  useEffect(() => {
    setFormData({
      username: currentUser?.username || "",
      password: currentUser?.password || "",
      expiresInMins: 30,
    });
  }, [currentUser]);

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleReset = () => {
    dispatch(iniActions.unsetTokenPair());
    dispatch(iniActions.unsetMe());
    setFormData({ username: "", password: "", expiresInMins: 30 });
    reset({ username: "", password: "", expiresInMins: 30 });
  };

  const onSubmit: SubmitHandler<IDummyAuth> = data => {
    apiAuthService.login(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    handleReset,
    onSubmit,
    formData,
    formFields,
  };
};
