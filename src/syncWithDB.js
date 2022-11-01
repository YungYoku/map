import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./main.js";
import { addObjectToMap } from "./mapInit.js";
import { formatCoordinatesToNumbersArray } from "./calculateArea.js";

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

export const drawFromDB = async () => {
  const ids = await loadIds();
  ids.forEach(async (id) => {
    id = id.replace(/\s/gi, "");
    const docRef = doc(db, "areas", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const points = docSnap.data().points;
      if (points) {
        addObjectToMap(formatCoordinatesToNumbersArray(points), true);
      }
    } else {
      console.log("No such document!");
    }
  });
};
