"""
SHAKTI SETU AI - Core Data Models & Schemas (Advanced Safety & Signal Grid)
============================================================================
Includes Multi-Modal Ambient Anomaly Signals, BLE Mesh Beacons,
Voice Duress Keywords, and Autonomous Emergency Dispatch.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class OrderStatus(str, Enum):
    NEW = "NEW"
    ANALYZING = "ANALYZING"
    ALLOCATED = "ALLOCATED"
    IN_PRODUCTION = "IN_PRODUCTION"
    QUALITY_CHECK = "QUALITY_CHECK"
    DISPATCHED = "DISPATCHED"
    DELIVERED = "DELIVERED"
    SETTLED = "SETTLED"

class TaskStatus(str, Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class DeliverySafetyStatus(str, Enum):
    SAFE = "SAFE"
    CHECKIN_DUE = "CHECKIN_DUE"
    SIGNAL_ANOMALY = "SIGNAL_ANOMALY"       # Ambient scream / drop detected
    ALERT_TRIGGERED = "ALERT_TRIGGERED"     # Explicit SOS
    CALL_ESCALATED = "CALL_ESCALATED"       # Phone call unresponsive
    RESOLVED = "RESOLVED"
    COMPLETED = "COMPLETED"

class AmbientSignalType(str, Enum):
    AUDIO_DECIBEL_SPIKE = "AUDIO_DECIBEL_SPIKE"       # Scream / struggle noise detected
    MOTION_FALL_IMPACT = "MOTION_FALL_IMPACT"         # Phone dropped suddenly / erratic movement
    GEO_IMMOBILITY = "GEO_IMMOBILITY"                 # Stationary in dark / isolated sector
    BLE_PEER_BEACON = "BLE_PEER_BEACON"               # Offline Bluetooth Mesh signal active

class AmbientSignalRecord(BaseModel):
    timestamp: str = Field(default_factory=lambda: datetime.now().strftime("%H:%M:%S"))
    signal_type: AmbientSignalType
    confidence_pct: float
    description: str
    sensor_telemetry: Dict[str, Any] = {}

class EmergencyCallRecord(BaseModel):
    id: str
    didi_name: str
    didi_phone: str
    initiated_at: str = Field(default_factory=lambda: datetime.now().strftime("%H:%M:%S"))
    call_status: str = "INITIATED"  # "RINGING", "NO_ANSWER_ESCALATED", "DTMF_SAFE_CONFIRMED"
    dispatched_to_contacts: List[str] = []
    ivr_transcript: str = "Didi, automated check-in from Shakti Setu. Press 1 if you are safe. If in distress, remain silent or say Help."

class SHGMember(BaseModel):
    id: str
    name: str
    phone: str
    village: str
    role: str = "Producer"
    skills: List[str]
    daily_capacity_units: int = 15
    current_workload_units: int = 0
    trust_score: float = 98.5
    upi_id: str
    total_earned_inr: float = 0.0

class DigitalSaathi(BaseModel):
    id: str
    name: str
    phone: str
    village: str
    smartphone_model: str = "Android 4G"
    active_deliveries: int = 0
    emergency_responder: bool = True
    commission_earned_inr: float = 0.0
    lat: float
    lng: float
    current_landmark: str
    ble_mesh_active: bool = True

class OrderItem(BaseModel):
    product_name: str
    quantity: int
    unit_price: float = 0.0

class Order(BaseModel):
    id: str
    customer_name: str
    customer_phone: str
    raw_input_text: str
    parsed_items: List[OrderItem] = []
    total_amount: float = 0.0
    status: OrderStatus = OrderStatus.NEW
    delivery_destination: str
    destination_landmark: str
    deadline_date: str
    assigned_saathi_id: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())
    bottleneck_detected: bool = False
    bottleneck_reason: Optional[str] = None

class ProductionTask(BaseModel):
    id: str
    order_id: str
    member_id: str
    member_name: str
    product_name: str
    quantity: int
    status: TaskStatus = TaskStatus.PENDING
    allocated_at: str = Field(default_factory=lambda: datetime.now().isoformat())
    completed_at: Optional[str] = None
    voice_update_logged: Optional[str] = None
    calculated_payout_inr: float = 0.0

class DeliveryTrip(BaseModel):
    id: str
    order_id: str
    didi_id: str
    didi_name: str
    saathi_id: str
    saathi_name: str
    start_time: str
    estimated_mins: int = 30
    elapsed_mins: int = 0
    safety_status: DeliverySafetyStatus = DeliverySafetyStatus.SAFE
    current_landmark: str
    didi_phone_battery: int = 85
    nearest_responders: List[Dict[str, Any]] = []
    ambient_signals: List[AmbientSignalRecord] = []
    emergency_calls: List[EmergencyCallRecord] = []
    ble_distress_active: bool = False
    sos_reason: Optional[str] = None

class PayoutReceipt(BaseModel):
    id: str
    order_id: str
    member_id: str
    member_name: str
    gross_product_value: float
    raw_material_deducted: float
    saathi_digital_fee: float
    didi_net_payout: float
    upi_transaction_ref: str
    timestamp: str
    cryptographic_trust_hash: str

class AgentActivityLog(BaseModel):
    timestamp: str = Field(default_factory=lambda: datetime.now().strftime("%H:%M:%S"))
    agent_name: str
    action_type: str
    reasoning: str
    details: Dict[str, Any] = {}
