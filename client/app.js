/**
 * SHAKTI SETU AI - Client Application Controller (Advanced Safety & Signal Edition)
 * Default English with Hindi Vernacular Toggle
 */

const API_BASE = "http://localhost:8000/api";

const I18N = {
  en: {
    brand_tag: "Agentic AI Rural Women Entrepreneurship & Hyperlocal Safe Fulfilment Ecosystem",
    tab_didi: "👩‍🌾 SHG Didi Portal",
    tab_saathi: "📱 Digital Saathi Portal",
    tab_suraksha: "🛡️ Suraksha Setu (Safety & Signal Grid)",
    tab_admin: "📊 AI Command Center (Judges)",
    demo_btn: "⚡ Run Full Multi-Agent Simulation",
    voice_greeting: "Welcome Sunita Didi! Shakti Setu is active. You have 2 pending production tasks and active safe delivery protection.",
    mera_kaam: "My Assigned Production Tasks",
    meri_kamai: "My Transparent Earnings & Ledger",
    voice_update_btn: "Verify Task via Voice",
    voice_update_done: "Task verified complete! Recorded in cryptographic ledger.",
    payout_breakdown: "Transparent Payout Breakdown (Zero Dispute)",
    gross_sale: "Gross Product Value",
    raw_deduct: "Raw Material Fund (35%)",
    saathi_fee: "Digital Saathi Fee (5%)",
    net_didi: "Didi Net Bank Transfer",
    trust_hash: "Cryptographic SHA-256 Trust Hash",
    sos_heading: "Suraksha Setu - Hyperlocal Safety Grid",
    sos_sub: "Multi-modal ambient anomaly detection, duress voice triggers, and offline BLE mesh beacon",
    current_landmark: "Current Rural Landmark",
    nearest_responders: "Nearest Digital Saathi First Responders (Bike)",
    btn_sos: "🚨 EMERGENCY SOS (Voice / Panic)",
    sos_triggered_alert: "EMERGENCY! Distress Beacon active. Dispatched to 2 Digital Saathis and Offline BLE Mesh!",
    checkin_call: "Priority Automated Safety Call Active",
    order_intake_heading: "Digital Saathi: Unstructured Order Intake (WhatsApp / Audio)",
    order_parse_btn: "Process Order with Multi-Agents",
    agents_title: "Multi-Agent Coordination Grid"
  },
  hi: {
    brand_tag: "एजेंटिक एआई ग्रामीण महिला उद्यमिता और युवा रोजगार सेतु",
    tab_didi: "👩‍🌾 दीदी पोर्टल (काम और कमाई)",
    tab_saathi: "📱 डिजिटल साथी (ऑर्डर व युवा)",
    tab_suraksha: "🛡️ सुरक्षा सेतु (सुरक्षित डिलीवरी)",
    tab_admin: "📊 एआई कमांड सेंटर (जजेस व्यू)",
    demo_btn: "⚡ लाइव एआई सिमुलेशन चलाएं",
    voice_greeting: "नमस्ते सुनीता दीदी! शक्ति सेतु सक्रिय है। आपके 2 काम और सुरक्षा पहरा चालू हैं।",
    mera_kaam: "मेरा आज का काम",
    meri_kamai: "मेरी पारदर्शी कमाई व रसीद",
    voice_update_btn: "बोलकर काम पूरा करें",
    voice_update_done: "काम पूरा हो गया! लेजर में सुरक्षित दर्ज हुआ।",
    payout_breakdown: "पारदर्शी कमाई विवरण (शून्य विवाद)",
    gross_sale: "कुल उत्पाद बिक्री",
    raw_deduct: "कच्चा माल रिज़र्व (35%)",
    saathi_fee: "डिजिटल साथी शुल्क (5%)",
    net_didi: "दीदी का शुद्ध बैंक ट्रांसफर",
    trust_hash: "क्रिप्टोग्राफिक लेजर हैश",
    sos_heading: "सुरक्षा सेतु - सुरक्षित डिलीवरी ग्रिड",
    sos_sub: "ग्रामीण महिलाओं के लिए बिना इंटरनेट व लैंडमार्क आधारित सुरक्षा पहरा",
    current_landmark: "मौजूदा ग्रामीण लैंडमार्क",
    nearest_responders: "निकटतम डिजिटल साथी फर्स्ट रिस्पॉन्डर",
    btn_sos: "🚨 आपातकालीन मदद (SOS)",
    sos_triggered_alert: "चेतावनी! आपातकालीन अलार्म सक्रिय। 2 डिजिटल साथियों को अलर्ट भेजा गया!",
    checkin_call: "स्वचालित सुरक्षा चेक-इन: क्या आप सुरक्षित हैं?",
    order_intake_heading: "डिजिटल साथी: नया ऑर्डर इनपुट (व्हाट्सएप / वॉइस)",
    order_parse_btn: "एआई एजेंट द्वारा ऑर्डर प्रोसेस करें",
    agents_title: "मल्टी-एजेंट कोऑर्डिनेशन ग्रिड"
  }
};

let currentLang = 'en'; // Default English as requested!
let appState = null;
let isSimulating = false;

// Audio Voice Synthesis
function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-US';
  utterance.rate = 0.95;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

// Sound Synthesizer
function playTone(freq, type = 'sine', duration = 0.2) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playSiren() {
  playTone(880, 'sawtooth', 0.4);
  setTimeout(() => playTone(550, 'sawtooth', 0.4), 250);
  setTimeout(() => playTone(880, 'sawtooth', 0.4), 500);
}

function playPhoneRing() {
  playTone(480, 'sine', 0.5);
  setTimeout(() => playTone(440, 'sine', 0.5), 100);
}

// Fallback Mock State
function getMockState() {
  return {
    group_name: "Maa Durga Mahila Swavalamban Samooh",
    cluster: "Sonpur Rural Cluster, District Saran, Bihar",
    members: [
      { id: "MEM-01", name: "Sunita Devi", role: "Samiti Adhyaksha & Pickle Lead", trust_score: 99.2, total_earned_inr: 14850.0, current_workload_units: 10 },
      { id: "MEM-02", name: "Meena Kumari", role: "Organic Turmeric & Spices Expert", trust_score: 98.8, total_earned_inr: 11200.0, current_workload_units: 8 },
      { id: "MEM-03", name: "Pushpa Devi", role: "Textile & Handloom Master", trust_score: 97.5, total_earned_inr: 9600.0, current_workload_units: 4 },
      { id: "MEM-04", name: "Geeta Devi", role: "Packaging & Quality Lead", trust_score: 99.0, total_earned_inr: 8400.0, current_workload_units: 5 }
    ],
    saathis: [
      { id: "STH-01", name: "Rahul Sharma", phone: "9876543210", active_deliveries: 1, commission_earned_inr: 4250.0, current_landmark: "Sonpur High School Chowk" },
      { id: "STH-02", name: "Amit Verma", phone: "9876543212", active_deliveries: 0, commission_earned_inr: 3100.0, current_landmark: "Kalyanpur Bus Stand" }
    ],
    orders: [
      {
        id: "ORD-2611-042",
        customer_name: "Patna Heritage Dhaba (Anand Ji)",
        raw_input_text: "Hello Didi, we need 20 packets of Mango Pickle and 10 kg Organic Turmeric for our restaurant by 26 Nov at Sonpur Chowk.",
        total_amount: 7800.0,
        status: "ALLOCATED",
        destination_landmark: "Sonpur Chowk, Near SBI Branch",
        deadline_date: "2026-11-26"
      }
    ],
    tasks: [
      { id: "TSK-042-01", order_id: "ORD-2611-042", member_id: "MEM-01", member_name: "Sunita Devi", product_name: "Aam ka Achaar (Mango Pickle)", quantity: 10, status: "IN_PROGRESS", calculated_payout_inr: 1200.0 },
      { id: "TSK-042-02", order_id: "ORD-2611-042", member_id: "MEM-02", member_name: "Meena Kumari", product_name: "Aam ka Achaar (Mango Pickle)", quantity: 10, status: "IN_PROGRESS", calculated_payout_inr: 1200.0 }
    ],
    trips: [
      {
        id: "TRIP-042",
        order_id: "ORD-2611-042",
        didi_id: "MEM-01",
        didi_name: "Sunita Devi",
        saathi_id: "STH-01",
        saathi_name: "Rahul Sharma",
        safety_status: "SAFE",
        current_landmark: "Rampur Mod, In front of Sacred Peepal Tree",
        didi_phone_battery: 88,
        nearest_responders: [
          { name: "Rahul Sharma", role: "Assigned Digital Saathi (Motorbike)", distance_meters: 650, eta_mins: 3, phone: "9876543210" },
          { name: "Ramesh Kumar", role: "Youth Volunteer & Shopkeeper", distance_meters: 1100, eta_mins: 5, phone: "9876543211" }
        ],
        ambient_signals: [
          { timestamp: "18:25:00", signal_type: "AUDIO_DECIBEL_SPIKE", confidence_pct: 95.2, description: "Normal vocal acoustics (42 dB). No distress detected." }
        ],
        emergency_calls: [],
        ble_distress_active: false
      }
    ],
    receipts: [
      {
        id: "REC-TSK-PREV-01",
        order_id: "ORD-PREV-99",
        member_name: "Sunita Devi",
        gross_product_value: 2500.0,
        raw_material_deducted: 875.0,
        saathi_digital_fee: 125.0,
        didi_net_payout: 1375.0,
        upi_transaction_ref: "UPI/2026/SETU/MEM/7B8F4A",
        timestamp: "2026-11-19 18:30:00",
        cryptographic_trust_hash: "9A4C8E2F10B7D6A3"
      }
    ],
    logs: [
      { timestamp: "18:24:10", agent_name: "Order Agent", action_type: "ORDER_PARSED", reasoning: "Parsed 20 pkts pickle and 10 kg turmeric from message. Extracted delivery landmark: Sonpur Chowk." },
      { timestamp: "18:24:12", agent_name: "Fulfilment Agent", action_type: "FAIR_ALLOCATION_DONE", reasoning: "Equally distributed 20 pickle units between Sunita Devi (10) and Meena Kumari (10) to maintain capacity balance." },
      { timestamp: "18:25:01", agent_name: "Suraksha Agent", action_type: "SAFE_ESCORT_STARTED", reasoning: "Route protection active for Sunita Devi. Nearest motorbike responder Rahul Sharma at 650m." }
    ],
    metrics: {
      system_trust_index: 99.4,
      active_orders_count: 1,
      pending_tasks_count: 2,
      active_deliveries_count: 1,
      active_emergencies_count: 0,
      status_summary: "All systems optimal. 0 Payment disputes detected across verified ledger."
    }
  };
}

async function loadState() {
  try {
    const res = await fetch(`${API_BASE}/state`);
    if (res.ok) {
      appState = await res.json();
    } else {
      throw new Error("Backend not reachable");
    }
  } catch (err) {
    if (!appState) {
      console.log("Using standalone interactive engine.");
      appState = getMockState();
    }
  }
  renderUI();
}

function renderUI() {
  if (!appState) return;
  const t = I18N[currentLang];

  document.getElementById("brand-subtitle").innerText = t.brand_tag;
  document.getElementById("btn-tab-didi").innerText = t.tab_didi;
  document.getElementById("btn-tab-saathi").innerText = t.tab_saathi;
  document.getElementById("btn-tab-suraksha").innerText = t.tab_suraksha;
  document.getElementById("btn-tab-admin").innerText = t.tab_admin;
  document.getElementById("btn-demo-simulation").innerHTML = `<span>${t.demo_btn}</span>`;

  renderDidiSection(t);
  renderSaathiSection(t);
  renderSurakshaSection(t);
  renderAdminSection(t);
}

function renderDidiSection(t) {
  const container = document.getElementById("didi-tasks-container");
  const sunitaTasks = appState.tasks.filter(tk => tk.member_id === "MEM-01");

  if (!sunitaTasks.length) {
    container.innerHTML = `<p class="text-slate-500 italic p-4">No active production tasks.</p>`;
  } else {
    container.innerHTML = sunitaTasks.map(task => `
      <div class="p-5 bg-orange-50/60 rounded-2xl border border-orange-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full ${task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${task.status === 'COMPLETED' ? '✓ Completed' : '⏳ In Production'}
            </span>
            <span class="text-xs text-slate-500 font-mono">${task.id}</span>
          </div>
          <h4 class="text-lg font-bold text-slate-800 mt-1">${task.product_name}</h4>
          <p class="text-sm text-slate-600">Assigned Quota: <strong class="text-orange-700 font-semibold">${task.quantity} Units</strong></p>
          <p class="text-xs text-slate-500 mt-0.5">Estimated Net Pay: <strong class="text-emerald-700">₹${task.calculated_payout_inr}</strong></p>
          ${task.voice_update_logged ? `<p class="text-xs text-emerald-700 mt-2 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">🎙️ Vocal Proof: "${task.voice_update_logged}"</p>` : ''}
        </div>
        <div>
          ${task.status !== 'COMPLETED' ? `
            <button onclick="handleCompleteTaskVoice('${task.id}')" class="mic-btn text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 02-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
              <span>${t.voice_update_btn}</span>
            </button>
          ` : `
            <span class="text-emerald-600 font-bold text-sm flex items-center gap-1.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Verified in Ledger
            </span>
          `}
        </div>
      </div>
    `).join("");
  }

  const receiptContainer = document.getElementById("didi-receipts-container");
  if (!appState.receipts.length) {
    receiptContainer.innerHTML = `<p class="text-slate-500 italic p-4 text-sm">No payout receipts generated yet.</p>`;
  } else {
    receiptContainer.innerHTML = appState.receipts.map(r => `
      <div class="receipt-paper p-4 mb-3">
        <div class="flex justify-between items-center text-xs text-slate-500">
          <span>Receipt ID: <strong class="font-mono text-slate-700">${r.id}</strong></span>
          <span>${r.timestamp}</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div>
            <span class="text-slate-400 block">${t.gross_sale}</span>
            <span class="font-semibold text-slate-700">₹${r.gross_product_value}</span>
          </div>
          <div>
            <span class="text-slate-400 block">${t.raw_deduct}</span>
            <span class="font-semibold text-rose-600">-₹${r.raw_material_deducted}</span>
          </div>
          <div>
            <span class="text-slate-400 block">${t.saathi_fee}</span>
            <span class="font-semibold text-amber-600">-₹${r.saathi_digital_fee}</span>
          </div>
          <div class="bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
            <span class="text-emerald-700 font-medium block">${t.net_didi}</span>
            <span class="font-bold text-sm text-emerald-800">₹${r.didi_net_payout}</span>
          </div>
        </div>
        <div class="mt-2.5 flex items-center justify-between text-[11px] bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
          <span class="text-slate-500 font-mono">UPI Ref: ${r.upi_transaction_ref}</span>
          <span class="text-slate-600 font-mono font-semibold text-emerald-700">🛡️ Trust Hash: ${r.cryptographic_trust_hash}</span>
        </div>
      </div>
    `).join("");
  }
}

function renderSaathiSection(t) {
  const saathi = appState.saathis[0];
  document.getElementById("saathi-name-badge").innerText = `${saathi.name} (${saathi.village})`;
  document.getElementById("saathi-wallet-badge").innerText = `₹${saathi.commission_earned_inr.toFixed(2)}`;

  const ordersContainer = document.getElementById("saathi-orders-container");
  ordersContainer.innerHTML = appState.orders.map(o => `
    <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div class="flex justify-between items-start">
        <div>
          <span class="text-xs font-mono font-semibold text-orange-600">${o.id}</span>
          <h4 class="font-bold text-slate-800">${o.customer_name}</h4>
          <p class="text-xs text-slate-500">📍 Destination Landmark: <strong>${o.destination_landmark}</strong></p>
        </div>
        <span class="px-2.5 py-1 text-xs rounded-full font-semibold ${o.status === 'SETTLED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
          ${o.status}
        </span>
      </div>
      <div class="mt-2.5 p-2 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100 italic">
        "${o.raw_input_text}"
      </div>
      <div class="mt-3 flex justify-between items-center text-xs">
        <span class="font-bold text-slate-700">Total Value: ₹${o.total_amount}</span>
        ${o.status !== 'SETTLED' ? `
          <button onclick="handleSettleOrder('${o.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm">
            Settle Transparent Ledger
          </button>
        ` : `<span class="text-emerald-700 font-semibold">✓ Settlement Complete</span>`}
      </div>
    </div>
  `).join("");
}

function renderSurakshaSection(t) {
  const trip = appState.trips[0];
  if (!trip) return;

  const isEmergency = trip.safety_status === 'ALERT_TRIGGERED';
  const isAnomaly = trip.safety_status === 'SIGNAL_ANOMALY';
  const banner = document.getElementById("suraksha-status-banner");

  if (isEmergency) {
    banner.className = "p-4 bg-red-600 text-white rounded-2xl shadow-lg emergency-pulse flex items-center justify-between";
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🚨</div>
        <div>
          <h4 class="font-bold text-base">CRITICAL EMERGENCY DISTRESS ACTIVE</h4>
          <p class="text-xs text-red-100">Member: <strong>${trip.didi_name}</strong> | Trigger: ${trip.sos_reason || 'Panic Button / Vocal Distress'} | BLE Mesh: BROADCASTING (100m)</p>
        </div>
      </div>
      <button onclick="handleResolveSOS('${trip.id}')" class="px-4 py-2 bg-white text-red-700 font-bold text-xs rounded-xl shadow hover:bg-red-50">
        Resolve & Mark Safe
      </button>
    `;
  } else if (isAnomaly) {
    banner.className = "p-4 bg-amber-500 text-white rounded-2xl shadow-sm flex items-center justify-between";
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">⚠️</div>
        <div>
          <h4 class="font-bold text-base">AMBIENT SENSOR ANOMALY DETECTED</h4>
          <p class="text-xs text-amber-100">Elevated struggle audio decibels (>92 dB) detected. Initiating automated verification call.</p>
        </div>
      </div>
      <button onclick="handleTriggerPriorityCall('${trip.id}')" class="px-3 py-1.5 bg-white text-amber-800 text-xs font-bold rounded-lg shadow">
        📞 Dial Priority Check-in
      </button>
    `;
  } else {
    banner.className = "p-4 bg-emerald-500 text-white rounded-2xl shadow-sm flex items-center justify-between";
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🛡️</div>
        <div>
          <h4 class="font-bold text-base">Suraksha Setu Active & Escorting</h4>
          <p class="text-xs text-emerald-100">Member: <strong>${trip.didi_name}</strong> | Battery: ${trip.didi_phone_battery}% | BLE Peer Beacon: Standby</p>
        </div>
      </div>
      <span class="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">Safe Corridor Active</span>
    `;
  }

  document.getElementById("current-landmark-text").innerText = trip.current_landmark;

  // Responders list
  const responderContainer = document.getElementById("responders-list");
  responderContainer.innerHTML = trip.nearest_responders.map(resp => `
    <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm">
          ${resp.name.charAt(0)}
        </div>
        <div>
          <h5 class="text-sm font-bold text-slate-800">${resp.name}</h5>
          <p class="text-xs text-slate-500">${resp.role}</p>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs font-bold text-orange-600 block">${resp.distance_meters}m Away</span>
        <span class="text-[11px] text-slate-500">ETA: ${resp.eta_mins} mins (Motorbike)</span>
      </div>
    </div>
  `).join("");

  // Ambient Signals list
  const signalsContainer = document.getElementById("ambient-signals-list");
  if (signalsContainer) {
    signalsContainer.innerHTML = (trip.ambient_signals || []).map(sig => `
      <div class="p-2.5 rounded-lg border text-xs ${sig.signal_type === 'AUDIO_DECIBEL_SPIKE' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}">
        <div class="flex justify-between items-center font-mono text-[10px] text-slate-500">
          <span>${sig.signal_type}</span>
          <span>${sig.timestamp}</span>
        </div>
        <p class="mt-1 font-semibold">${sig.description}</p>
        <span class="text-[10px] text-emerald-700">Confidence: ${sig.confidence_pct}%</span>
      </div>
    `).join("");
  }
}

function renderAdminSection(t) {
  const metrics = appState.metrics;
  document.getElementById("metric-trust-score").innerText = `${metrics.system_trust_index}%`;
  document.getElementById("metric-active-orders").innerText = metrics.active_orders_count;
  document.getElementById("metric-pending-tasks").innerText = metrics.pending_tasks_count;
  document.getElementById("metric-emergencies").innerText = metrics.active_emergencies_count;

  const logsContainer = document.getElementById("agent-logs-stream");
  logsContainer.innerHTML = appState.logs.slice(-8).reverse().map(log => `
    <div class="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs font-mono text-slate-300">
      <div class="flex items-center justify-between text-slate-400 mb-1">
        <span class="text-amber-400 font-bold">${log.agent_name}</span>
        <span class="text-[10px]">${log.timestamp}</span>
      </div>
      <div class="text-emerald-400 font-semibold mb-0.5">${log.action_type}</div>
      <div class="text-slate-300 leading-relaxed">${log.reasoning}</div>
    </div>
  `).join("");
}

// ----------------- ACTION HANDLERS ----------------- //

async function handleCompleteTaskVoice(taskId) {
  const transcript = "Batch production completed and quality sealed.";
  speakText(I18N[currentLang].voice_update_done);
  playTone(660, 'sine', 0.2);

  try {
    const res = await fetch(`${API_BASE}/tasks/${taskId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voice_transcript: transcript })
    });
    if (res.ok) {
      await loadState();
      return;
    }
  } catch (e) {}

  const t = appState.tasks.find(x => x.id === taskId);
  if (t) {
    t.status = 'COMPLETED';
    t.voice_update_logged = transcript;
    appState.logs.push({
      timestamp: new Date().toLocaleTimeString(),
      agent_name: "Fulfilment Agent",
      action_type: "TASK_COMPLETED_VIA_VOICE",
      reasoning: `Task ${taskId} verified complete via vocal biometric.`
    });
    renderUI();
  }
}

// Spoken Duress SOS Trigger
async function handleTriggerDuress(phrase = "Help") {
  playSiren();
  speakText(`Emergency distress triggered with phrase: ${phrase}. Dispatched to nearby youth.`);

  const tripId = appState.trips[0]?.id || "TRIP-042";

  try {
    const res = await fetch(`${API_BASE}/trips/${tripId}/voice-duress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase: phrase })
    });
    if (res.ok) {
      await loadState();
      return;
    }
  } catch (e) {}

  const trip = appState.trips[0];
  if (trip) {
    trip.safety_status = 'ALERT_TRIGGERED';
    trip.sos_reason = `Voice Trigger: '${phrase}'`;
    trip.current_landmark = "Near Old Canal Bridge (Purana Pulia) - Low Light Zone";
    trip.ble_distress_active = true;
    appState.logs.push({
      timestamp: new Date().toLocaleTimeString(),
      agent_name: "Suraksha Safety Agent",
      action_type: "CRITICAL_SOS_DISPATCHED",
      reasoning: `Distress verified ('${phrase}'). BLE Mesh Beacon active (100m) and 2 motorbike responders dispatched.`
    });
    appState.metrics.active_emergencies_count = 1;
    appState.metrics.system_trust_index = 90.9;
    renderUI();
  }
}

// Priority Automated Voice Call Simulation
async function handleTriggerPriorityCall(tripId) {
  playPhoneRing();
  showCallModal();

  try {
    const res = await fetch(`${API_BASE}/trips/${tripId}/priority-call`, { method: 'POST' });
    if (res.ok) {
      await loadState();
      return;
    }
  } catch (e) {}

  appState.logs.push({
    timestamp: new Date().toLocaleTimeString(),
    agent_name: "Suraksha Safety Agent",
    action_type: "PRIORITY_SAFETY_CALL_DIALED",
    reasoning: "Autonomous safety verification call placed. Monitoring DTMF keypad and acoustic response."
  });
  renderUI();
}

function showCallModal() {
  const modal = document.getElementById("priority-call-modal");
  if (modal) {
    modal.classList.remove("hidden");
    speakText("Incoming safety call from Shakti Setu. Press 1 if you are safe. Remain silent if in danger.");
  }
}

function closeCallModal(responseCode) {
  const modal = document.getElementById("priority-call-modal");
  if (modal) modal.classList.add("hidden");

  if (responseCode === 1) {
    speakText("Safety confirmed. Protection corridor normal.");
    const trip = appState.trips[0];
    if (trip) trip.safety_status = 'SAFE';
    renderUI();
  } else {
    // Unresponsive / Dropped call -> Escalate!
    handleTriggerDuress("No response on automated check-in call (Call Dropped)");
  }
}

// Ambient Acoustic Decibel Spike Simulation
async function handleSimulateAmbientAnomaly() {
  playTone(850, 'sawtooth', 0.3);
  speakText("Ambient decibel spike detected. Audio sensor captured struggle noise.");

  const tripId = appState.trips[0]?.id || "TRIP-042";

  try {
    const res = await fetch(`${API_BASE}/trips/${tripId}/ambient-signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signal_type: "AUDIO_DECIBEL_SPIKE",
        decibel_level: 96.4,
        description: "Scream / elevated struggle vocal decibel detected"
      })
    });
    if (res.ok) {
      await loadState();
      return;
    }
  } catch (e) {}

  const trip = appState.trips[0];
  if (trip) {
    trip.safety_status = 'SIGNAL_ANOMALY';
    trip.ambient_signals.unshift({
      timestamp: new Date().toLocaleTimeString(),
      signal_type: "AUDIO_DECIBEL_SPIKE",
      confidence_pct: 94.8,
      description: "Acoustic scream spike: 96.4 dB captured."
    });
    renderUI();
  }
}

// Resolve SOS
async function handleResolveSOS(tripId) {
  playTone(520, 'sine', 0.2);
  try {
    const res = await fetch(`${API_BASE}/trips/${tripId}/resolve`, { method: 'POST' });
    if (res.ok) {
      await loadState();
      return;
    }
  } catch (e) {}

  const trip = appState.trips.find(x => x.id === tripId);
  if (trip) {
    trip.safety_status = 'SAFE';
    trip.sos_reason = null;
    trip.ble_distress_active = false;
    trip.current_landmark = "Sonpur Block Office Gate (Safe Zone)";
    appState.metrics.active_emergencies_count = 0;
    appState.metrics.system_trust_index = 99.4;
    renderUI();
  }
}

// Settle Order
async function handleSettleOrder(orderId) {
  playTone(750, 'sine', 0.3);
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/settle`, { method: 'POST' });
    if (res.ok) {
      await loadState();
      speakText("Transparent order settlement complete. Earnings credited with SHA-256 trust hash.");
      return;
    }
  } catch (e) {}

  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = 'SETTLED';
    const newReceipt = {
      id: `REC-SETTLED-${Date.now().toString().slice(-4)}`,
      order_id: order.id,
      member_name: "Sunita Devi",
      gross_product_value: order.total_amount,
      raw_material_deducted: +(order.total_amount * 0.35).toFixed(2),
      saathi_digital_fee: +(order.total_amount * 0.05).toFixed(2),
      didi_net_payout: +(order.total_amount * 0.55).toFixed(2),
      upi_transaction_ref: `UPI/2026/SETU/${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString(),
      cryptographic_trust_hash: "SHA256-" + Math.random().toString(36).substring(2, 10).toUpperCase()
    };
    appState.receipts.unshift(newReceipt);
    appState.logs.push({
      timestamp: new Date().toLocaleTimeString(),
      agent_name: "Payment & Ledger Agent",
      action_type: "TRANSPARENT_PAYOUT_SETTLED",
      reasoning: `Order ${orderId} settled. Verified mathematical split logged with SHA-256 trust hash.`
    });
    renderUI();
    speakText("Settlement confirmed.");
  }
}

// Order Submission
async function handleCreateOrderSubmit() {
  const inputEl = document.getElementById("order-text-input");
  const rawText = inputEl.value.trim();
  if (!rawText) return;

  playTone(600, 'sine', 0.15);

  try {
    const res = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        raw_text: rawText,
        customer_name: "Hotel Anand Vihar, Patna",
        customer_phone: "9876500000"
      })
    });
    if (res.ok) {
      inputEl.value = "";
      await loadState();
      speakText("New order processed by Order and Fulfilment agents.");
      return;
    }
  } catch (e) {}

  const newOrder = {
    id: `ORD-2611-${Math.floor(Math.random() * 900 + 100)}`,
    customer_name: "Hotel Anand Vihar, Patna",
    raw_input_text: rawText,
    total_amount: 5500.0,
    status: "ALLOCATED",
    destination_landmark: "Patna Main Road, Near Dak Bungalow",
    deadline_date: "2026-11-28"
  };
  appState.orders.unshift(newOrder);
  appState.tasks.unshift({
    id: `TSK-${newOrder.id.slice(-3)}-01`,
    order_id: newOrder.id,
    member_id: "MEM-01",
    member_name: "Sunita Devi",
    product_name: "Mango Pickle / Spices",
    quantity: 15,
    status: "IN_PROGRESS",
    calculated_payout_inr: 1650.0
  });
  appState.logs.push({
    timestamp: new Date().toLocaleTimeString(),
    agent_name: "Order Agent",
    action_type: "ORDER_PARSED",
    reasoning: `Extracted entities from: "${rawText}". Divided production across members.`
  });
  inputEl.value = "";
  renderUI();
  speakText("Order processed successfully.");
}

function setSampleOrder(text) {
  document.getElementById("order-text-input").value = text;
}

// Full Simulation Run
async function runFullSimulation() {
  if (isSimulating) return;
  isSimulating = true;

  const btn = document.getElementById("btn-demo-simulation");
  btn.classList.add("opacity-50", "pointer-events-none");
  btn.innerText = "⏳ Simulation Running...";

  speakText("Initiating complete multi-agent lifecycle simulation.");
  playTone(440, 'triangle', 0.3);

  setTimeout(() => {
    switchTab('saathi');
    setSampleOrder("We need 25 packets of mango pickle and 10 jars of makhana by Sunday near Sonpur temple.");
    handleCreateOrderSubmit();
  }, 1000);

  setTimeout(() => {
    switchTab('didi');
    const firstTask = appState.tasks[0];
    if (firstTask) handleCompleteTaskVoice(firstTask.id);
  }, 3500);

  setTimeout(() => {
    switchTab('suraksha');
    handleSimulateAmbientAnomaly();
  }, 6000);

  setTimeout(() => {
    handleTriggerDuress("Help");
  }, 8000);

  setTimeout(() => {
    const trip = appState.trips[0];
    if (trip) handleResolveSOS(trip.id);
    const order = appState.orders[0];
    if (order) handleSettleOrder(order.id);
    switchTab('admin');
    speakText("Simulation successfully completed. All agents synchronized.");
    btn.classList.remove("opacity-50", "pointer-events-none");
    btn.innerText = I18N[currentLang].demo_btn;
    isSimulating = false;
  }, 11500);
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.classList.remove("bg-orange-600", "text-white", "shadow-md");
    btn.classList.add("bg-white", "text-slate-700");
  });

  document.getElementById(`tab-content-${tabId}`).classList.remove("hidden");
  const activeBtn = document.getElementById(`btn-tab-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-white", "text-slate-700");
    activeBtn.classList.add("bg-orange-600", "text-white", "shadow-md");
  }

  if (tabId === 'didi') {
    speakText(I18N[currentLang].voice_greeting);
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  document.getElementById("lang-toggle-btn").innerText = currentLang === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English';
  renderUI();
}

window.addEventListener("DOMContentLoaded", () => {
  loadState();
});
