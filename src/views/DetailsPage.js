// import React, { useEffect, useState } from "react";
// import { Card, Col, Container, Image, Row } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Navigation from "../components/Navigation";
// import "../detailspage.css";


// export default function DetailsPage() {
//   const [documents, setDocuments] = useState([]);
//   const params = useParams();
//   const collectionId = params.collectionId;
//   const [user, loading] = useAuthState(auth);
//   const navigate = useNavigate();

//   async function fetchDocuments() {
//     try {
//       const collectionRef = collection(db, collectionId);
//       const snapshot = await getDocs(collectionRef);
//       const documentsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setDocuments(documentsData);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     }
//   }

//   useEffect(() => {
//     if (loading || !user) return; 
//     fetchDocuments(); 
//   }, [collectionId, loading, user]); 

//   return (
//     <>
//       <Navigation />
//       <Container>
//     <div className="details-page-container">
//       {documents.map((document) => (
//         <div key={document.id} className="details-page-image-container">
//           <Image src={document.image} className="details-page-image" />
//         </div>
//       ))}
//     </div>
//   </Container>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Card, Col, Container, Image, Row } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db, storage } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Navigation from "../components/Navigation";
// import "../detailspage.css";

// export default function DetailsPage() {
//   const [documents, setDocuments] = useState([]);
//   const params = useParams();
//   const collectionId = params.collectionId;
//   const [user, loading] = useAuthState(auth);
//   const navigate = useNavigate();

//   // Function to handle file upload
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const storageRef = storage.ref();
//     const fileRef = storageRef.child(file.name);
//     await fileRef.put(file);
//     // Add logic to store file URL in Firestore
//     // and update documents state accordingly
//   };

//   // Function to fetch documents from Firestore
//   async function fetchDocuments() {
//     try {
//       const collectionRef = collection(db, collectionId);
//       const snapshot = await getDocs(collectionRef);
//       const documentsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setDocuments(documentsData);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     }
//   }

//   useEffect(() => {
//     if (loading || !user) return; 
//     fetchDocuments(); 
//   }, [collectionId, loading, user]); 

//   return (
//     <>
//       <Navigation />
//       <Container>
//         <div className="details-page-container">
//           {documents.map((document) => (
//             <div key={document.id} className="details-page-image-container">
//               <Image src={document.image} className="details-page-image" />
//             </div>
//           ))}
//         </div>
//         <Form>

//         </Form.Group>
//           <Image 
//           src = {previewImage} 
//           style={{
//             objectFit:"cover",
//             width: "10rem",
//             height: "10rem"
//           }}
//           />

//         <Form.Group className="mb-3" controlId="image">
//             <Form.Label>Image</Form.Label>
//             <Form.Control
//               type="file"
//               onChange={(e) => {
//                 // console.log(e.target.files[0]);
//                 const imageFile=e.target.files[0];
//                 setImage(e.target.files[0]);
//                 const previewImage = URL.createObjectURL(imageFile);
//                 setPreviewImage(previewImage);
//               }}
//             />
            
//             <Form.Text className="text-muted">
//               Make sure the url has a image type at the end: jpg, jpeg, png.
//             </Form.Text>
//           </Form.Group>
//           <Button variant="primary" onClick={(e) => updatePost()}>
//             Submit
//           </Button>
//         </Form>

//       </Container>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import Navigation from "../components/Navigation";
import "../detailspage.css";

export default function DetailsPage() {
  const [documents, setDocuments] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams();
  const collectionId = params.collectionId;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function fetchDocuments() {
    try {
      const collectionRef = collection(db, collectionId);
      const snapshot = await getDocs(collectionRef);
      const documentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(documentsData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      alert("Please enter an image URL");
      return;
    }
    try {
      const collectionRef = collection(db, collectionId);
      const newDocumentRef = doc(collectionRef);
      await setDoc(newDocumentRef, { image: imageUrl });
      setImageUrl(""); // Clear input field after upload
      fetchDocuments(); // Refresh documents after upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  useEffect(() => {
    if (loading || !user) return; 
    fetchDocuments(); 
  }, [collectionId, loading, user]); 

  return (
    <>
      <Navigation />
      <Container>
        <div className="details-page-container">
          {documents.map((document) => (
            <div key={document.id} className="details-page-image-container">
              <Image src={document.image} className="details-page-image" />
            </div>
          ))}
        </div>
        <Form onSubmit={handleImageUpload}>
          <Form.Group controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={handleImageUrlChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Upload Image
          </Button>
        </Form>
      </Container>
    </>
  );
}
