export function getBPCategory(
  systolic: number,
  diastolic: number,
): { category: string; color: string } {
  if (systolic < 120 && diastolic < 80) {
    return { category: "Normal", color: "text-emerald-400" };
  } else if (systolic < 130 && diastolic < 80) {
    return { category: "Elevated", color: "text-yellow-400" };
  } else if (systolic < 140 || diastolic < 90) {
    return { category: "Hypertension Stage 1", color: "text-orange-400" };
  } else {
    return { category: "Hypertension Stage 2", color: "text-rose-400" };
  }
}
