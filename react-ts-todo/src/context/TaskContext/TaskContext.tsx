import {
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
  useState,
} from "react";

export const TaskContext = createContext({
  updated: false,
  toggle: () => {},
});

export const TaskContextProvider: FC<PropsWithChildren> = (
  props
): ReactElement => {
  const [updated, setUpdated] = useState(false);

  const toggle = () => setUpdated(!updated);

  return (
    <TaskContext.Provider value={{ updated, toggle }}>
      {props.children}
    </TaskContext.Provider>
  );
};
