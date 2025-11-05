export const lineData = {
  labels: [
    "Jul 1",
    "Jul 5",
    "Jul 9",
    "Jul 13",
    "Jul 17",
    "Jul 21",
    "Jul 25",
    "Jul 29",
  ],
  datasets: [
    {
      label: "Mentions",
      data: [5200, 4300, 4900, 10200, 6800, 2300, 1200, 900],
      borderColor: "#007aff",
      backgroundColor: "rgba(0, 122, 255, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

export const barData = {
  labels: ["Neutral", "Negative", "Positive"],
  datasets: [
    {
      label: "Mentions",
      data: [54000, 11000, 8000],
      backgroundColor: ["#007aff", "#e74c3c", "#2ecc71"],
    },
  ],
};

export const textData = {
  content: [
    "The substance of the universe is obedient and compliant; and the reason which governs it has in itself no cause for doing evil, for  it has no malice, nor does it do evil to anything, nor is anything  harmed by it. But all things are made and perfected according to this reason.",
    "Let it make no difference to thee whether thou art cold or warm, if thou art doing thy duty; and whether thou art drowsy or praised. Look within.",
  ],
};
