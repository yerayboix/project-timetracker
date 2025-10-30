import AddTimetracker from "./_components/add-timetracker";
import TimetrackerBreadcrumb from "./breadcrum";

export default function Page() {
    return (
        <>
            <TimetrackerBreadcrumb />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <AddTimetracker />
            </div>
        </>
    )
}