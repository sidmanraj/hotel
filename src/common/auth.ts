import firebase from "firebase/app";
import "firebase/auth";
import { IMessage, Status } from "../models/Status";

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<IMessage> => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await response.user?.updateProfile({
      displayName: firstName + "" + lastName,
    });
    return { status: Status.Success, message: response.user?.uid };
  } catch (error) {
    return { status: Status.Failed, message: error.message };
  }
};

export const signOut = async () => {
  await firebase.auth().signOut();
};

export const logIn = async (
  email: string,
  password: string
): Promise<IMessage> => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return { status: Status.Success, message: response.user?.uid };
  } catch (error) {
    return { status: Status.Failed, message: error.message };
  }
};

export function errorMessage(type?: string) {
  if (!type) return "";
  switch (type) {
    case "minLength":
      return "Min length not satisfied";
    case "maxLength":
      return "Max length not satisfied";
    case "pattern":
      return "Pattern not satisfied";
    case "required":
      return "this is requied field";
  }
  return "";
}
