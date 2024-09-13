// // const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
// //   ssr: false,
// // });
// import FroalaEditor from "react-froala-wysiwyg";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";

// import "froala-editor/js/plugins/image.min.js";
// import "froala-editor/js/plugins.pkgd.min.js";
// import "froala-editor/js/plugins/align.min.js";
// import "froala-editor/js/languages/de.js";
// import "froala-editor/js/third_party/image_tui.min.js";
// import "froala-editor/js/third_party/embedly.min.js";
// // import "froala-editor/js/third_party/spell_checker.min.js";
// import "froala-editor/js/third_party/font_awesome.min.js";
// import "font-awesome/css/font-awesome.css";
// import FroalaEditor2 from "froala-editor";

// export default function Editor({ name }: { name: string }) {
//   const getBase64 = (file: File) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };
//   function handleImageUpload(this: FroalaEditor2, files: FileList) {
//     // Handle image upload here
//     // For example, upload the image to a server and get the new URL
//     const newImageUrl = "https://example.com/path/to/uploaded/image.jpg";

//     // Change the src attribute of the image
//     console.log(files[0]);
//     console.log(this.commands);
//     return false; // Prevent the default image upload behavior
//   }
//   return (
//     <FroalaEditor
//       name={name}
//       tag="textarea"
//       config={{
//         tag: "textarea",
//         imageUploadURL: "/api/something",
//         imageUploadMethod: "POST",
//         imageUploadParams: { id: "" },
//         // imageAllowedTypes: ["svg"],
//         charCounterMax: 10,
//         events: {
//           "image.beforeUpload": async function (
//             this: FroalaEditor2,
//             files: FileList
//           ) {
//             const file = files[0];
//             if (file) {
//               try {
//                 const base64String = await getBase64(file);
//                 console.log(base64String);

//                 // Do something with the base64 string
//               } catch (error) {
//                 console.error("Error converting file to base64:", error);
//               }
//             }
//             return true;
//           },
//           "image.error": function (
//             this: FroalaEditor2,
//             error: any,
//             response: any
//           ) {
//             // Bad link.
//             if (error.code == 1) {
//               console.log("bad link");
//             }

//             // No link in upload response.
//             else if (error.code == 2) {
//               console.log("No link in upload response.");
//             }

//             // Error during image upload.
//             else if (error.code == 3) {
//               console.log("Error during image upload.");
//             }

//             // Parsing response failed.
//             else if (error.code == 4) {
//               console.log("Parsing response failed.");
//             }

//             // Image too text-large.
//             else if (error.code == 5) {
//               console.log("Image too text-large.");
//             }

//             // Invalid image type.
//             else if (error.code == 6) {
//               console.log("Invalid image type.");
//             }

//             // Image can be uploaded only to same domain in IE 8 and IE 9.
//             else if (error.code == 7) {
//               console.log(
//                 "Image can be uploaded only to same domain in IE 8 and IE 9."
//               );
//             }

//             // Response contains the original server response to the request if available.
//           },
//         },
//       }}
//     />
//   );
// }
