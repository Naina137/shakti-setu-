"""
SHAKTI SETU AI - FastAPI Production Server (Advanced Safety Edition)
===================================================================
Unified backend API serving:
1. Multi-Agent Orchestration endpoints
2. Multi-Modal Ambient Anomaly Signals & BLE Mesh Beacon
3. Autonomous Interactive Priority Emergency Calling
4. Static Client UI with Voice & Vernacular capabilities
"""

import os
import sys

# Ensure current directory is in sys.path for root execution (Render / Cloud)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from models import (
    SHGMember, DigitalSaathi, Order, OrderStatus, ProductionTask,
    TaskStatus, DeliveryTrip, DeliverySafetyStatus, AmbientSignalType,
    PayoutReceipt, AgentActivityLog
)
from agents import (
    OrderManagementAgent, FulfilmentAgent, PaymentLedgerAgent,
    SurakshaSafetyAgent, GuardianSupervisorAgent
)

app = FastAPI(
    title="SHAKTI SETU AI API",
    description="Agentic Rural Women Entrepreneurship & Hyperlocal Safe Fulfilment Ecosystem",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- IN-MEMORY STATE ----------------- #

STATE: Dict[str, Any] = {
    "group_name": "Maa Durga Mahila Swavalamban Samooh",
    "cluster": "Sonpur Rural Cluster, District Saran, Bihar",
    "members": [
        SHGMember(
            id="MEM-01",
            name="Sunita Devi",
            phone="9876500001",
            village="Kalyanpur",
            role="Samiti Adhyaksha & Pickle Specialist",
            skills=["Aam ka Achaar", "Nimbu Mirch Achaar"],
            daily_capacity_units=20,
            current_workload_units=10,
            trust_score=99.2,
            upi_id="sunita.shg@okhdfcbank",
            total_earned_inr=14850.0
        ),
        SHGMember(
            id="MEM-02",
            name="Meena Kumari",
            phone="9876500002",
            village="Rampur",
            role="Spice & Organic Haldi Expert",
            skills=["Organic Haldi", "Roasted Makhana"],
            daily_capacity_units=15,
            current_workload_units=8,
            trust_score=98.8,
            upi_id="meena.shg@okaxis",
            total_earned_inr=11200.0
        ),
        SHGMember(
            id="MEM-03",
            name="Pushpa Devi",
            phone="9876500003",
            village="Sonpur",
            role="Textile & Handloom Master",
            skills=["Handloom Dupatta", "Jute Bag"],
            daily_capacity_units=8,
            current_workload_units=4,
            trust_score=97.5,
            upi_id="pushpa.devi@paytm",
            total_earned_inr=9600.0
        ),
        SHGMember(
            id="MEM-04",
            name="Geeta Devi",
            phone="9876500004",
            village="Sonpur",
            role="Packaging & Quality Lead",
            skills=["Packaging", "Sealing", "Quality Check"],
            daily_capacity_units=25,
            current_workload_units=5,
            trust_score=99.0,
            upi_id="geeta.shg@ybl",
            total_earned_inr=8400.0
        )
    ],
    "saathis": [
        DigitalSaathi(
            id="STH-01",
            name="Rahul Sharma",
            phone="9876543210",
            village="Sonpur",
            active_deliveries=1,
            emergency_responder=True,
            commission_earned_inr=4250.0,
            lat=25.6850,
            lng=85.1950,
            current_landmark="Sonpur High School Chowk"
        ),
        DigitalSaathi(
            id="STH-02",
            name="Amit Verma",
            phone="9876543212",
            village="Kalyanpur",
            active_deliveries=0,
            emergency_responder=True,
            commission_earned_inr=3100.0,
            lat=25.6980,
            lng=85.2080,
            current_landmark="Kalyanpur Bus Stand"
        )
    ],
    "orders": [],
    "tasks": [],
    "trips": [],
    "receipts": [],
    "logs": []
}

def seed_initial_data():
    sample_raw = "Hello Didi, we need 20 packets of Mango Pickle and 10 kg Organic Turmeric for our restaurant by 26 Nov at Sonpur Chowk."
    order, log1 = OrderManagementAgent.parse_unstructured_order(
        sample_raw, "Patna Heritage Dhaba (Anand Ji)", "9812345678"
    )
    STATE["orders"].append(order)
    STATE["logs"].append(log1)

    tasks, log2 = FulfilmentAgent.allocate_tasks(order, STATE["members"])
    STATE["tasks"].extend(tasks)
    STATE["logs"].append(log2)

    trip, log3 = SurakshaSafetyAgent.initiate_trip(order, STATE["members"][0], STATE["saathis"][0])
    STATE["trips"].append(trip)
    STATE["logs"].append(log3)

seed_initial_data()

# ----------------- REQUEST SCHEMAS ----------------- #

class CreateOrderRequest(BaseModel):
    raw_text: str
    customer_name: str = "Local Buyer / Business"
    customer_phone: str = "9876543210"

class VoiceTaskUpdateRequest(BaseModel):
    voice_transcript: str = "My 10 jars of mango pickle are ready and packed."

class VoiceDuressRequest(BaseModel):
    phrase: str = "Help"

class AmbientSignalRequest(BaseModel):
    signal_type: str = "AUDIO_DECIBEL_SPIKE"  # or "MOTION_FALL_IMPACT"
    decibel_level: float = 94.2
    description: str = "Scream / elevated struggle vocal decibel detected"

# ----------------- API ROUTES ----------------- #

@app.get("/api/state")
def get_full_state():
    metrics = GuardianSupervisorAgent.inspect_system_health(
        STATE["orders"], STATE["tasks"], STATE["trips"]
    )
    return {
        "group_name": STATE["group_name"],
        "cluster": STATE["cluster"],
        "members": [m.model_dump() for m in STATE["members"]],
        "saathis": [s.model_dump() for s in STATE["saathis"]],
        "orders": [o.model_dump() for o in STATE["orders"]],
        "tasks": [t.model_dump() for t in STATE["tasks"]],
        "trips": [tr.model_dump() for tr in STATE["trips"]],
        "receipts": [r.model_dump() for r in STATE["receipts"]],
        "logs": [l.model_dump() for l in STATE["logs"]][-20:],
        "metrics": metrics
    }

@app.post("/api/orders/create")
def create_order(req: CreateOrderRequest):
    order, order_log = OrderManagementAgent.parse_unstructured_order(
        req.raw_text, req.customer_name, req.customer_phone
    )
    STATE["orders"].insert(0, order)
    STATE["logs"].append(order_log)

    tasks, alloc_log = FulfilmentAgent.allocate_tasks(order, STATE["members"])
    STATE["tasks"].extend(tasks)
    STATE["logs"].append(alloc_log)

    return {
        "status": "SUCCESS",
        "order": order.model_dump(),
        "tasks_allocated": len(tasks),
        "agent_logs": [order_log.model_dump(), alloc_log.model_dump()]
    }

@app.post("/api/tasks/{task_id}/complete")
def complete_task(task_id: str, req: VoiceTaskUpdateRequest):
    for t in STATE["tasks"]:
        if t.id == task_id:
            t.status = TaskStatus.COMPLETED
            t.voice_update_logged = req.voice_transcript
            for m in STATE["members"]:
                if m.id == t.member_id:
                    m.current_workload_units = max(0, m.current_workload_units - t.quantity)
                    m.trust_score = min(100.0, round(m.trust_score + 0.2, 1))

            log = AgentActivityLog(
                agent_name="Fulfilment Agent",
                action_type="TASK_COMPLETED_VIA_VOICE",
                reasoning=f"Task {task_id} completed by {t.member_name}. Verified vocal proof: '{req.voice_transcript}'.",
                details={"task_id": task_id}
            )
            STATE["logs"].append(log)
            return {"status": "SUCCESS", "task": t.model_dump(), "log": log.model_dump()}

    raise HTTPException(status_code=404, detail="Task not found")

@app.post("/api/trips/{trip_id}/ambient-signal")
def report_ambient_signal(trip_id: str, req: AmbientSignalRequest):
    """Ingests ambient decibel spikes, screams, or physical fall impacts."""
    for tr in STATE["trips"]:
        if tr.id == trip_id:
            sig_enum = AmbientSignalType.AUDIO_DECIBEL_SPIKE if req.signal_type == "AUDIO_DECIBEL_SPIKE" else AmbientSignalType.MOTION_FALL_IMPACT
            updated_trip, log = SurakshaSafetyAgent.detect_ambient_anomaly(
                tr, sig_enum, {"decibel": req.decibel_level, "description": req.description, "confidence_pct": 94.8}
            )
            STATE["logs"].append(log)
            return {"status": "ANOMALY_LOGGED", "trip": updated_trip.model_dump(), "log": log.model_dump()}

    raise HTTPException(status_code=404, detail="Trip not found")

@app.post("/api/trips/{trip_id}/priority-call")
def trigger_priority_call(trip_id: str):
    """Dispatches autonomous priority IVR call to the Didi's device."""
    for tr in STATE["trips"]:
        if tr.id == trip_id:
            updated_trip, call_rec, log = SurakshaSafetyAgent.initiate_automated_priority_call(tr)
            STATE["logs"].append(log)
            return {"status": "CALL_DISPATCHED", "call": call_rec.model_dump(), "log": log.model_dump()}

    raise HTTPException(status_code=404, detail="Trip not found")

@app.post("/api/trips/{trip_id}/voice-duress")
def trigger_duress(trip_id: str, req: VoiceDuressRequest):
    """Triggers voice duress (direct 'Help' or disguised code words)."""
    for tr in STATE["trips"]:
        if tr.id == trip_id:
            updated_trip, log = SurakshaSafetyAgent.trigger_duress_sos(tr, req.phrase)
            STATE["logs"].append(log)
            return {"status": "DURESS_ALARM_DISPATCHED", "trip": updated_trip.model_dump(), "log": log.model_dump()}

    raise HTTPException(status_code=404, detail="Trip not found")

@app.post("/api/trips/{trip_id}/resolve")
def resolve_trip(trip_id: str):
    for tr in STATE["trips"]:
        if tr.id == trip_id:
            tr.safety_status = DeliverySafetyStatus.COMPLETED
            tr.ble_distress_active = False
            log = AgentActivityLog(
                agent_name="Suraksha Safety Agent",
                action_type="DELIVERY_CONFIRMED_SAFE",
                reasoning=f"Trip {trip_id} resolved safely. Didi escorted to destination.",
                details={"trip_id": trip_id}
            )
            STATE["logs"].append(log)
            return {"status": "RESOLVED", "trip": tr.model_dump(), "log": log.model_dump()}

    raise HTTPException(status_code=404, detail="Trip not found")

@app.post("/api/orders/{order_id}/settle")
def settle_order(order_id: str):
    target_order = next((o for o in STATE["orders"] if o.id == order_id), None)
    if not target_order:
        raise HTTPException(status_code=404, detail="Order not found")

    order_tasks = [t for t in STATE["tasks"] if t.order_id == order_id]
    saathi = STATE["saathis"][0]

    receipts, log = PaymentLedgerAgent.generate_settlement_receipt(target_order, order_tasks, saathi)
    STATE["receipts"].extend(receipts)
    STATE["logs"].append(log)
    target_order.status = OrderStatus.SETTLED

    for r in receipts:
        for m in STATE["members"]:
            if m.id == r.member_id:
                m.total_earned_inr += r.didi_net_payout

    return {
        "status": "SETTLED",
        "order_id": order_id,
        "receipts": [r.model_dump() for r in receipts],
        "log": log.model_dump()
    }

# Mount static client directory
client_dir = os.path.join(os.path.dirname(__file__), "..", "client")
if os.path.exists(client_dir):
    app.mount("/", StaticFiles(directory=client_dir, html=True), name="client")

if __name__ == "__main__":
    import uvicorn
    print("[SERVER] Starting SHAKTI SETU AI Server on http://localhost:8000")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
