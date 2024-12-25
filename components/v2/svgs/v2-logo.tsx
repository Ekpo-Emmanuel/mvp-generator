import LogoSvg from "./logo";
import Link from "next/link";


export default function V2LogoSvg() {
    return (
        <Link href="/v2" className="flex items-end">
            <LogoSvg className="fill-primary"/>
            <div className="text-[10px] translate-y-1 tracking-tighter font-semibold">v2</div>
        </Link>
    )
}