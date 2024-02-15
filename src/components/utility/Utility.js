// var [data, setData] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     };
//     axios
//       .get(
//         "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users",
//         config
//       )
//       .then((res) => setData(res.data));
//     setLoaded(true);
//   }, []);

//   const statusOptions = [
//     "Inactive",
//     "Blacklisted",
//     "Pending",
//     "Active",
//     "Others",
//   ];
//   const maritalStatus = ["Single", "Married", "Divorced"];
//   const children = ["None", "Yes"];
//   const typeofResidence = ["Parent's house", "Own Apartment"];
//   const relationship = ["Sister", "Brother", "Mother", "Father", "Colleague"];

//   const getRandomItem = (arr) => {
//     const randomIndex = Math.floor(Math.random() * arr.length);
//     const item = arr[randomIndex];
//     return item;
//   };

//   const convertDate = (item) => {
//     return new Date(item).toISOString().split("T")[0];
//   };

//   if (loaded) {
//     localStorage.setItem("data", JSON.stringify(data));

//     var updatedData = JSON.parse(localStorage.getItem("data")).map((user) => {
//       if ("status" in data) {
//         return { ...user };
//       } else {
//         return {
//           ...user,
//           status: getRandomItem(statusOptions),
//           maritalStatus: getRandomItem(maritalStatus),
//           children: getRandomItem(children),
//           typeofResidence: getRandomItem(typeofResidence),
//           guarantorRelationship: getRandomItem(relationship),
//           createdAt: convertDate(user.createdAt),
//         };
//       }
//     });
//     localStorage.setItem("data", JSON.stringify(updatedData));
//   }