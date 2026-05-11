import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAXyxFfvJK7Gpz4qQEBEDaJNqJyb6Z3pJk",
  authDomain: "undangan-b8fdc.firebaseapp.com",
  projectId: "undangan-b8fdc",
  storageBucket: "undangan-b8fdc.firebasestorage.app",
  messagingSenderId: "921306556337",
  appId: "1:921306556337:web:2d5f25786d48a35bf0bf90",
  measurementId: "G-4DB06SM9RP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const kirimBtn = document.getElementById("kirimBtn");
const daftarUcapan = document.getElementById("daftarUcapan");
const countHadir = document.getElementById("countHadir");
const totalUcapan = document.getElementById("totalUcapan");

// Kirim ucapan
kirimBtn.addEventListener("click", async () => {
  const nama = document.getElementById("nama").value.trim();
  const kehadiran = document.getElementById("kehadiran").value;
  const ucapan = document.getElementById("ucapan").value.trim();

  if (!nama || !ucapan) {
    Swal.fire({ icon: 'warning', text: 'Nama dan ucapan wajib diisi!' });
    return;
  }

  await addDoc(collection(db, "ucapan"), { nama, kehadiran, ucapan, waktu: new Date() });
  document.getElementById("nama").value = "";
  document.getElementById("ucapan").value = "";
});

// Realtime display & hitung statistik
const q = query(collection(db, "ucapan"), orderBy("waktu", "desc"));
onSnapshot(q, (snapshot) => {
  daftarUcapan.innerHTML = "";

  let hadir = 0;
  let total = snapshot.size;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.kehadiran === "Hadir") hadir++;

    daftarUcapan.innerHTML += `
      <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-pink-500">
        <p class="font-semibold text-gray-800">${data.nama} <span class="text-sm text-gray-500">(${data.kehadiran})</span></p>
        <p class="text-gray-700 mt-1">${data.ucapan}</p>
      </div>
    `;
  });

  // Update jumlah hadir & total ucapan
  countHadir.textContent = hadir;
  totalUcapan.textContent = total;
});
