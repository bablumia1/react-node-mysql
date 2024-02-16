import { ChangeEvent, MouseEvent } from "react";

export interface ITaskFooter {
  onStatusChange?: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>,
    id: string
  ) => void;
  id: string;
  status?: string;
}
