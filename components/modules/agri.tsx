"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSim } from "@/components/SimContext";
import { toast } from "@/components/Toast";
import { Bar, Flag, Panel, Pill, Src, Stat, ViewHead } from "@/components/ui";
import { BarRows, CameraGrid, DistrictMap, FunnelRows, Timeline, TwoLine } from "@/components/charts";

const STATUS_CLASS: Record<string, string> = {
  Registered: "p-reg",
  Verified: "p-ver",
  Funded: "p-fun",
  Producing: "p-pro",
  Selling: "p-sel",
};

const TRACE_KNOWN: Record<string, string> = {
  "B-5521": "Batch B-5521 is in transit to the buyer. Truck left the packhouse at 06:40.",
  "B-5522": "Batch B-5522 is in cold storage, graded Class 2.",
  "B-5523": "Batch B-5523 was delivered and the farmer has been paid.",
  "B-5524": "Batch B-5524 was rejected for pest damage. An extension officer visit is booked.",
};

export function AgriOverview() {
  const { cfg, sim, actions } = useSim();
  const router = useRouter();
  const counts = cfg.districts.map((_, i) => sim.farmers.filter((f) => f.district === i).length);
  return (
    <>
      <section className="hero hero-cols">
        <div>
          <h1>Every rand of farmer support, traced to a harvest and a sale.</h1>
          <p>
            One provincial platform that registers mini-farmers and SMMEs, controls how support money flows, runs the
            new packhouses, and links produce to buyers - with HMH security on the assets the province has paid for.
          </p>
        </div>
        <div className="journey" aria-label="Farmer journey">
          {[
            ["Register and verify", "ID, land, household, co-op membership"],
            ["Fund against a plan", "Inputs, mechanisation, blended finance"],
            ["Produce and pack", "Extension visits, packhouse intake, grading"],
            ["Sell and get paid", "Matched offtake, traceable payment"],
          ].map((s, i) => (
            <div className="step" key={s[0]}>
              <span className="n">{i + 1}</span>
              <div>
                {s[0]}
                <small>{s[1]}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="grid g4">
        <Stat v="R1.2bn" l="DARD 2026/27 budget" />
        <Stat v="R153.1m" l="CASP production and infrastructure support" />
        <Stat v="7" l="State-funded packhouses built, launches ongoing" />
        <Stat v="2,200+" l="Farmers targeted for training" />
      </div>
      <div className="grid g2 mt">
        <Panel title="Registered farmers and SMMEs by district" className="map">
          <DistrictMap
            counts={counts}
            onSelect={() => {
              actions.setStageFilter("All");
              router.push("/farmer");
            }}
          />
          <Src>Schematic, not to scale.</Src>
        </Panel>
        <Panel title="What leadership sees on one screen">
          <Flag tone="warn" title="R 4.8m disbursed with no production recorded after 90 days">
            Fund control, 17 beneficiaries flagged for extension follow-up
          </Flag>
          <Flag title="FMD movement restriction active in 2 wards">
            Provincial insights, livestock sales routed to vaccinated herds only
          </Flag>
          <Flag tone="warn" title="Packhouse capacity at 41 percent this week">
            Packhouse network, 3 buyer orders unmatched in Market access
          </Flag>
          <Flag title="After-hours intrusion at a mechanisation depot">
            Asset protection, response dispatched, footage stored
          </Flag>
        </Panel>
      </div>
    </>
  );
}

export function AgriFund() {
  return (
    <>
      <ViewHead title="Fund control">
        For the MEC for Finance: see where farmer and SMME support money goes, stop leakage before it happens, and
        prove outcomes per rand spent.
      </ViewHead>
      <div className="grid g4">
        <Stat v="R 78.9m" l="Disbursed this year" />
        <Stat v="84%" l="Disbursed funds verified on farm" />
        <Stat v="R 2.14" l="Farm-gate sales per R1 support" />
        <Stat v="R 3.6m" l="Payments stopped by risk checks" />
      </div>
      <div className="grid g2 mt">
        <Panel title="Support pipeline" className="funnel">
          <FunnelRows
            stages={[
              ["Applications", 1240, "R 186.0m"],
              ["Verified eligible", 910, "R 138.4m"],
              ["Approved", 640, "R 96.2m"],
              ["Disbursed", 512, "R 78.9m"],
              ["Verified on farm", 431, "R 66.1m"],
            ]}
          />
        </Panel>
        <Panel title="Risk checks before payment">
          <Flag title="Same ID number on 2 applications">Held automatically, both applicants notified</Flag>
          <Flag title="Input voucher redeemed outside home district">
            Supplier and beneficiary asked to confirm delivery
          </Flag>
          <Flag tone="warn" title="No extension visit logged after funding">
            17 beneficiaries, officer visits scheduled
          </Flag>
          <Flag tone="warn" title="Supplier price 38 percent above provincial benchmark">
            Procurement review requested
          </Flag>
        </Panel>
      </div>
      <Panel title="Funding instruments on the platform" className="mt">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Who it serves</th>
                <th>How it is controlled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CASP inputs and infrastructure</td>
                <td>Emerging and mini-farmers</td>
                <td>Digital voucher, geo-tagged delivery photo</td>
                <td>
                  <Pill v="p-ver">Proposed</Pill>
                </td>
              </tr>
              <tr>
                <td>SMME working capital</td>
                <td>Agro-processors, poultry, beekeepers</td>
                <td>Paid against verified offtake orders</td>
                <td>
                  <Pill v="p-fun">Proposed</Pill>
                </td>
              </tr>
              <tr>
                <td>Blended finance with a DFI or bank</td>
                <td>Farmers ready to scale</td>
                <td>Platform credit score shared with lender</td>
                <td>
                  <Pill v="p-reg">Proposed</Pill>
                </td>
              </tr>
              <tr>
                <td>Mechanisation pool</td>
                <td>Co-ops and villages</td>
                <td>Booking, usage hours, Asset protection tracking</td>
                <td>
                  <Pill v="p-ver">Proposed</Pill>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Src>Illustrative structure for discussion</Src>
      </Panel>
    </>
  );
}

const AGRI_ACTIVITIES = [
  "Vegetables",
  "Maize",
  "Sunflower",
  "Livestock",
  "Poultry SMME",
  "Beekeeping SMME",
  "Agro-processing SMME",
];
const STAGE_CHIPS = ["All", "Registered", "Verified", "Funded", "Producing", "Selling"];

export function AgriFarmer() {
  const { cfg, sim, actions } = useSim();
  const nameRef = useRef<HTMLInputElement>(null);
  const distRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const farmers = sim.farmers;
  const list = farmers.filter((f) => sim.stageFilter === "All" || f.status === sim.stageFilter);

  const register = () => {
    const name = nameRef.current?.value.trim() || "";
    if (!name) {
      toast("Enter a name or business to register");
      nameRef.current?.focus();
      return;
    }
    actions.registerFarmer({
      name,
      district: +(distRef.current?.value || 0),
      type: typeRef.current?.value || "Vegetables",
      size: sizeRef.current?.value.trim() || "",
    });
    if (nameRef.current) nameRef.current.value = "";
    if (sizeRef.current) sizeRef.current.value = "";
  };

  return (
    <>
      <ViewHead title="Farmer registry">
        Register mini-farmers and SMMEs once, verify them, and follow each one from first support to first sale.
        Designed to work offline for extension officers in the field.
      </ViewHead>
      <div className="grid g4">
        <Stat v={farmers.length} l="Records in the register" />
        <Stat v={farmers.filter((f) => f.status === "Selling").length} l="Selling into formal markets" />
        <Stat
          v={Math.round(farmers.reduce((a, f) => a + f.score, 0) / farmers.length)}
          l="Average market-readiness score"
          src="Out of 100"
        />
        <Stat v={farmers.filter((f) => /SMME/.test(f.type)).length} l="Agri SMMEs" />
      </div>
      <Panel title="Register a farmer or SMME" className="mt">
        <div className="form">
          <label>
            Name or business
            <input ref={nameRef} placeholder="e.g. Keabetswe Farms" required />
          </label>
          <label>
            District
            <select ref={distRef} defaultValue="0">
              {cfg.districts.map((d, i) => (
                <option value={i} key={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label>
            Activity
            <select ref={typeRef} defaultValue="Vegetables">
              {AGRI_ACTIVITIES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            Size
            <input ref={sizeRef} placeholder="e.g. 4 ha or 30 head" />
          </label>
          <button className="btn alt" type="button" onClick={register}>
            Register farmer
          </button>
        </div>
      </Panel>
      <Panel title="Farmer and SMME register" className="mt">
        <div style={{ marginBottom: 10 }}>
          {STAGE_CHIPS.map((s) => (
            <button
              className="chip"
              type="button"
              key={s}
              aria-pressed={s === sim.stageFilter}
              onClick={() => actions.setStageFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>District</th>
                <th>Activity</th>
                <th>Size</th>
                <th>Stage</th>
                <th>Readiness</th>
                <th>Support received</th>
              </tr>
            </thead>
            <tbody>
              {list.length ? (
                list.map((f) => (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>{f.name}</td>
                    <td>{cfg.districts[f.district]}</td>
                    <td>{f.type}</td>
                    <td>{f.size}</td>
                    <td>
                      <Pill v={STATUS_CLASS[f.status]}>{f.status}</Pill>
                    </td>
                    <td style={{ minWidth: 110 }}>
                      <Bar pct={f.score} label={`${f.score}/100`} />
                    </td>
                    <td>{f.support}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="muted">
                    No records at this stage yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

const ORDERS: [string, string, string, string][] = [
  ["Municipal fresh produce market", "Cabbage, 8 t weekly", "Setlopo Growers, Kgomotso M.", "Matched"],
  ["Regional retail distribution centre", "Tomatoes, 5 t weekly", "Naledi Fresh", "Matched"],
  ["School nutrition programme supplier", "Spinach, 2 t weekly", "Tshepo Agri Co-op", "Pending quality check"],
  ["Local abattoir", "Weaners, 60 head monthly", "Boitumelo L., Kabelo S.", "Blocked - FMD status"],
  ["Hospitality group", "Honey, 400 kg monthly", "Lerato Honey Works", "Matched"],
  ["Feed mill", "Maize, 120 t seasonal", "Dineo K. plus 6 growers", "Open - aggregating"],
];
const ORDER_PILL: Record<string, string> = {
  Matched: "p-ver",
  "Pending quality check": "p-fun",
  "Open - aggregating": "p-reg",
};

export function AgriMarketAccess() {
  const [matched, setMatched] = useState<number[]>([]);
  return (
    <>
      <ViewHead title="Market access">
        Turn production into sales. Buyers post demand, the platform aggregates small farmers into volumes buyers can
        accept, and payment is tracked back to each farmer.
      </ViewHead>
      <div className="grid g3">
        <Stat v="R 11.4m" l="Offtake contracted this season" />
        <Stat v="63" l="Buyer orders on the platform" />
        <Stat v="9 days" l="Average time from order to first delivery" />
      </div>
      <Panel title="Buyer demand and matches" className="mt">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Buyer type</th>
                <th>Demand</th>
                <th>Supplying farmers</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o, i) => {
                const status = matched.includes(i) ? "Matched" : o[3];
                const open = o[3].startsWith("Open") && !matched.includes(i);
                return (
                  <tr key={i}>
                    <td>{o[0]}</td>
                    <td>{o[1]}</td>
                    <td>{o[2]}</td>
                    <td>
                      <Pill v={ORDER_PILL[status] || "p-flag"}>{status}</Pill>
                    </td>
                    <td>
                      {open ? (
                        <button
                          className="btn ghost"
                          type="button"
                          onClick={() => {
                            setMatched((m) => [...m, i]);
                            toast("Matched: 7 growers aggregated into one supply contract");
                          }}
                        >
                          Run match
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Src>Buyer types are illustrative, no real buyers named</Src>
      </Panel>
    </>
  );
}

const PACKHOUSES: [string, string, number, string, boolean?][] = [
  ["Bloemhof packhouse", "Dr Ruth Segomotsi Mompati", 78, "Vegetables", true],
  ["Packhouse B", "Bojanala Platinum", 52, "Vegetables"],
  ["Packhouse C", "Ngaka Modiri Molema", 33, "Vegetables"],
  ["Packhouse D", "Dr Kenneth Kaunda", 46, "Vegetables"],
  ["Packhouse E", "Ngaka Modiri Molema", 21, "Commissioning"],
  ["Packhouse F", "Bojanala Platinum", 0, "Commissioning"],
  ["Packhouse G", "Dr Ruth Segomotsi Mompati", 0, "Commissioning"],
];

export function AgriPack() {
  return (
    <>
      <ViewHead title="Packhouse network">
        Run the province&apos;s packhouses as one network: intake, grading, cold storage, labelling and dispatch, with
        each crate linked back to the farmer who grew it.
      </ViewHead>
      <div className="grid g4">
        <Stat v="7" l="Packhouses in the provincial programme" />
        <Stat v="41%" l="Network capacity used this week" />
        <Stat v="3.2%" l="Post-harvest loss at intake" />
        <Stat v="1,184" l="Crates dispatched this week" />
      </div>
      <Panel title="Packhouse network" className="mt">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Packhouse</th>
                <th>District</th>
                <th>Status</th>
                <th style={{ minWidth: 160 }}>Capacity used</th>
              </tr>
            </thead>
            <tbody>
              {PACKHOUSES.map((p) => (
                <tr key={p[0]}>
                  <td>
                    {p[0]}
                    {p[4] ? <small className="muted"> (opened Aug 2026)</small> : null}
                  </td>
                  <td>{p[1]}</td>
                  <td>{p[3] === "Commissioning" ? <Pill v="p-reg">Commissioning</Pill> : <Pill v="p-ver">Operating</Pill>}</td>
                  <td>
                    <Bar pct={p[2]} label={`${p[2]}%`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

export function AgriQuality() {
  return (
    <>
      <ViewHead title="Grading and inspection">
        Grade produce the same way at every packhouse, show farmers exactly why a batch was downgraded, and send an
        extension officer where quality keeps failing.
      </ViewHead>
      <div className="grid g3">
        <Stat v="91%" l="Batches passing first inspection" />
        <Stat v="412" l="Inspections logged this month" />
        <Stat v="26" l="Farmers referred for extension support" />
      </div>
      <div className="grid g2 mt">
        <Panel title="Why batches were rejected">
          <BarRows
            rows={[
              ["Size out of spec", 34],
              ["Bruising", 22],
              ["Pest damage", 18],
              ["Late harvest", 14],
              ["Packaging", 12],
            ]}
          />
          <Src>Share of rejected batches</Src>
        </Panel>
        <Panel title="Latest inspections">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Farmer</th>
                  <th>Grade</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>B-5521</td>
                  <td>Naledi Fresh</td>
                  <td>
                    <Pill v="p-ver">Class 1</Pill>
                  </td>
                  <td>Passed</td>
                </tr>
                <tr>
                  <td>B-5522</td>
                  <td>Setlopo Growers</td>
                  <td>
                    <Pill v="p-fun">Class 2</Pill>
                  </td>
                  <td>Uneven sizing</td>
                </tr>
                <tr>
                  <td>B-5523</td>
                  <td>Kgomotso M.</td>
                  <td>
                    <Pill v="p-ver">Class 1</Pill>
                  </td>
                  <td>Passed</td>
                </tr>
                <tr>
                  <td>B-5524</td>
                  <td>Tshepo Agri Co-op</td>
                  <td>
                    <Pill v="p-flag">Rejected</Pill>
                  </td>
                  <td>Pest damage, officer notified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}

export function AgriFlow() {
  const { sim } = useSim();
  const inRef = useRef<HTMLInputElement>(null);
  const [out, setOut] = useState("Enter a number to see where the produce is now.");
  const trace = () => {
    const q = (inRef.current?.value || "").trim().toUpperCase();
    const f = sim.farmers.find((x) => x.id === q);
    setOut(
      TRACE_KNOWN[q] ||
        (f
          ? f.name + " is at stage: " + f.status + ". Support received: " + f.support + "."
          : "No batch or farmer found with that number. Try B-5521 to B-5524 or a farmer ID from the register.")
    );
  };
  return (
    <>
      <ViewHead title="Batch trace">
        Follow any batch from the farm to the buyer. If a claim or a disease alert comes in, the province knows within
        minutes which farms, trucks and stores are affected.
      </ViewHead>
      <div className="grid g2">
        <Panel title="Batch B-5521 - tomatoes, Naledi Fresh">
          <Timeline
            items={[
              { t: "Harvested", s: "Farm block 2, geo-tagged photo captured" },
              { t: "Received at packhouse", s: "Intake weight logged, 2.4 t" },
              { t: "Graded Class 1", s: "Grading inspection passed" },
              { t: "Cold store", s: "Temperature within range" },
              { t: "Dispatched", s: "Truck tracked, seal number recorded" },
              { t: "Delivered to buyer", s: "Awaiting proof of delivery", pending: true },
              { t: "Farmer paid", s: "Released on proof of delivery", pending: true },
            ]}
          />
        </Panel>
        <Panel title="Search a batch or farmer">
          <div className="form">
            <label>
              Batch number or farmer ID
              <input ref={inRef} placeholder="e.g. B-5524" onKeyDown={(e) => e.key === "Enter" && trace()} />
            </label>
            <button className="btn" type="button" onClick={trace}>
              Trace batch
            </button>
          </div>
          <p className="muted" style={{ marginTop: 14 }}>
            {out}
          </p>
        </Panel>
      </div>
    </>
  );
}

export function AgriSight() {
  return (
    <>
      <ViewHead title="Provincial insights">
        Give the MECs the numbers that matter: production, sales, disease and weather risk, and the return on every
        programme, updated daily instead of in quarterly reports.
      </ViewHead>
      <div className="grid g2">
        <Panel title="Farm-gate sales versus support paid, R millions">
          <TwoLine
            labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
            a={[1.1, 1.4, 1.3, 1.9, 2.4, 2.9]}
            b={[2.2, 1.8, 1.6, 1.4, 1.2, 1.1]}
          />
          <div style={{ display: "flex", gap: 16, fontSize: "12.5px" }} className="muted">
            <span>
              <b style={{ color: "var(--ok)" }}>&#9632;</b> Sales by supported farmers
            </span>
            <span>
              <b style={{ color: "var(--accent)" }}>&#9632;</b> Support paid
            </span>
          </div>
        </Panel>
        <Panel title="Risk watch">
          <Flag title="Foot and mouth disease">
            Outbreak shaping the department&apos;s 2026/27 plans. The platform would block livestock sales from
            unvaccinated herds.
          </Flag>
          <Flag tone="warn" title="Dry spell forecast">
            Irrigation scheduling advice pushed to 214 vegetable farmers
          </Flag>
          <Flag tone="warn" title="Input price rise">
            Fertiliser benchmark up, voucher values reviewed
          </Flag>
        </Panel>
      </div>
    </>
  );
}

const AGRI_CAMS = [
  "Packhouse intake bay",
  "Mechanisation depot gate",
  "Cold store door",
  "Livestock handling pen",
  "Input store",
  "Perimeter north fence",
];

export function AgriShield() {
  return (
    <>
      <ViewHead title="Asset protection">
        Protect what the province pays for. HMH-integrated cameras, access control and AI alerts on packhouses, depots,
        input stores and livestock facilities, feeding straight into the platform.
      </ViewHead>
      <div className="grid g4">
        <Stat v="148" l="Cameras connected" />
        <Stat v="23" l="Sites protected" />
        <Stat v="4 min" l="Average alert to response" />
        <Stat v="R 1.9m" l="Assets recovered or losses avoided" />
      </div>
      <Panel title="Sample sites" className="mt">
        <CameraGrid cams={AGRI_CAMS} platform="agri" />
        <Src>Placeholder feeds</Src>
      </Panel>
      <Panel title="Recent events" className="mt">
        <Flag title="After-hours intrusion, mechanisation depot">
          Person detected at 02:14, security dispatched, tractor accounted for
        </Flag>
        <Flag tone="warn" title="Cold store door open 12 minutes">
          Packhouse manager alerted, temperature stable
        </Flag>
        <Flag tone="warn" title="Livestock count mismatch">
          Evening count 3 head below morning count, owner notified
        </Flag>
      </Panel>
    </>
  );
}
