/* Body dan Font */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff8f0;
  margin: 0;
  padding: 0;
}

/* Header */
header {
  text-align: center;
  padding: 20px 0;
}

header img {
  width: 120px;
  margin-bottom: 10px;
}

header h1 {
  color: #ff69b4;
  font-size: 2em;
  margin: 0;
}

/* Card Section */
section {
  background-color: #fff0f5;
  padding: 20px;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 900px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Input */
input {
  margin-right: 10px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 150px;
  box-sizing: border-box;
}

/* Button */
button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background-color: #ff69b4;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #ff85c1;
}

/* Tabel */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #ffe4e1;
  font-weight: bold;
}

/* Total Section */
.total-section {
  background-color: #fffacd;
  padding: 15px;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 900px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.total-section h3 {
  margin: 5px 0;
}

/* Responsif */
@media (max-width: 600px) {
  input {
    width: 100%;
    margin-bottom: 10px;
  }

  button {
    width: 100%;
  }
}
