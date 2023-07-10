import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../main";
import { addObjectToMap } from "./mapInit";
import { formatCoordinatesToNumbersArray } from "./calculateArea";

export const addToDB = async (title = "Title", points = []) => {
  const areaRef = await addDoc(collection(db, "areas"), {
    title,
    points,
  });

  const idRef = doc(db, "areas", "ids");
  await updateDoc(idRef, {
    ids: arrayUnion(areaRef.id),
  });
};

const loadIds = async () => {
  const docRef = doc(db, "areas", "ids");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().ids || [];
  } else {
    console.log("No such document!");
  }
};

const loadPoints = async (id) => {
  const docRef = doc(db, "areas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data) {
      return data;
    }
  } else {
    console.log("No such document!");
  }
};

export const drawFromDB = async () => {
  const ids = await loadIds();
  for (let id of ids) {
    id = id.replace(/\s/gi, "");
    const data = await loadPoints(id);
    addObjectToMap(
      formatCoordinatesToNumbersArray(data.points),
      data.title,
      true
    );
  }
};
