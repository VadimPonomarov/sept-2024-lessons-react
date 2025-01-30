import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { apiUsers } from "@/api/apiUsers.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/store/useApp.ts";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { useEffectOnce } from "@/common/hooks/useEffectOnce.tsx";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";
import { IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import ComboBox from "@/components/All/ComboBox/ComboBox.tsx";
import { ResizableWrapper } from "@/components/All/ResizableWrapper/ResizableWrapper.tsx";
import { useLoginForm } from "@/components/Forms/LoginForm/useLoginForm.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

import css from "@/components/Forms/LoginForm/index.module.css";

const LoginForm = () => {
  const [, setParams] = useSearchParams();
  const { comboBoxItems: users } = useAppSelector(state => state.ini);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, errors, isValid, handleReset, onSubmit, formFields } =
    useLoginForm();

  const { data } = useFetch<IUsersResponse>({
    queryKey: "users",
    cb: apiUsers.users,
  });

  useEffectOnce(() => {
    setParams({ limit: "0" });
  });

  useEffect(() => {
    if (data) {
      dispatch(iniActions.setComboBoxItems(data));
      dispatch(iniActions.setUsersAll(data.users));
    }
  }, [dispatch, data]);

  return (
    <div className={css.container}>
      <ResizableWrapper>
        <ComboBox
          items={users || []}
          onSelect={(id: number) => dispatch(iniActions.setCurrentUserById(id))}
        />
        <div className={"text-3xl text-center"}>Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          {Object.entries(formFields).map(([key, { label, type }]) => (
            <div key={key} className={css.formGroup}>
              <label htmlFor={key}>{label}</label>
              <Input {...register(key as keyof IDummyAuth)} id={key} type={type} />
              {errors[key as keyof IDummyAuth] && (
                <p className={css.error}>{errors[key as keyof IDummyAuth]?.message}</p>
              )}
            </div>
          ))}
          <div className={css.buttonGroup}>
            <Button type="submit" disabled={!isValid}>
              Login
            </Button>
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </ResizableWrapper>
    </div>
  );
};

export default LoginForm;
