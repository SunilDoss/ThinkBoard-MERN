export function formatDateAndTime(date){
    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata", 
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}