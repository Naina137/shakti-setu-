"""
SHAKTI SETU AI - Streamlit Operations & Analytics Dashboard
===========================================================
Interactive operations console for SHG Federations, NRLM Officers,
and Hackathon Judges to monitor live Agentic orchestration.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime

st.set_page_config(
    page_title="SHAKTI SETU AI - Dashboard",
    page_icon="🌾",
    layout="wide"
)

# Title & Banner
st.markdown("""
<div style="background: linear-gradient(135deg, #ea580c, #f59e0b); padding: 20px; border-radius: 15px; color: white; margin-bottom: 25px;">
    <h1 style="margin: 0; font-size: 2.2rem;">🌾 SHAKTI SETU AI</h1>
    <p style="margin: 5px 0 0 0; font-size: 1.05rem; opacity: 0.95;">
        Agentic AI Rural Women Entrepreneurship & Safe Fulfilment Ecosystem
    </p>
    <p style="margin: 5px 0 0 0; font-size: 0.85rem; opacity: 0.8;">
        GAVS Hackathon | Problem 8.1: Solving Chaotic Fulfilment & Pay for Women's SHGs
    </p>
</div>
""", unsafe_allow_html=True)

# Top KPI Metrics
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(label="System Trust Score", value="99.2%", delta="0% Disputes")
with col2:
    st.metric(label="Total SHG Group Earnings", value="₹44,050", delta="+₹7,800 this week")
with col3:
    st.metric(label="Orders Fulfilled On-Time", value="98.5%", delta="+14.2% vs manual")
with col4:
    st.metric(label="Youth Saathi Commissions", value="₹7,350", delta="2 Active Saathis")

st.divider()

# Tabs
tab1, tab2, tab3, tab4 = st.tabs([
    "📊 Financial Transparency & Payouts",
    "🤖 Agentic AI Orchestration Trace",
    "🛡️ Suraksha Setu (Rural Safety Grid)",
    "👩‍🌾 Member Capacity & Fair Workload"
])

with tab1:
    st.subheader("Member-Wise Earnings Breakdown (Transparent Ledger)")
    
    # Financial Data
    data = [
        {"Member": "Sunita Devi", "Role": "Pickle Lead", "Units Made": 120, "Gross Value (₹)": 30000, "Raw Material (₹)": 10500, "Saathi Fee (₹)": 1500, "Net Payout (₹)": 14850},
        {"Member": "Meena Kumari", "Role": "Spices Expert", "Units Made": 90, "Gross Value (₹)": 25200, "Raw Material (₹)": 9900, "Saathi Fee (₹)": 1260, "Net Payout (₹)": 11200},
        {"Member": "Pushpa Devi", "Role": "Textile Master", "Units Made": 32, "Gross Value (₹)": 19200, "Raw Material (₹)": 7040, "Saathi Fee (₹)": 960, "Net Payout (₹)": 9600},
        {"Member": "Geeta Devi", "Role": "Packaging Lead", "Units Made": 240, "Gross Value (₹)": 16800, "Raw Material (₹)": 5880, "Saathi Fee (₹)": 840, "Net Payout (₹)": 8400}
    ]
    df = pd.DataFrame(data)

    col_chart, col_table = st.columns([1, 1])
    
    with col_chart:
        fig = px.bar(
            df, x="Member", y=["Net Payout (₹)", "Raw Material (₹)", "Saathi Fee (₹)"],
            title="Revenue Distribution per SHG Member",
            barmode="stack",
            color_discrete_sequence=["#10b981", "#ef4444", "#f59e0b"]
        )
        st.plotly_chart(fig, use_container_width=True)

    with col_table:
        st.dataframe(df, use_container_width=True)
        st.info("🛡️ Every transaction generates a cryptographic SHA-256 Trust Hash that eliminates member suspicion and disputes.")

with tab2:
    st.subheader("Autonomous Multi-Agent Activity Log")
    
    agent_logs = [
        {"Time": "18:24:10", "Agent": "Order Agent", "Action": "PARSE_UNSTRUCTURED_AUDIO", "Details": "Converted Hindi voice note to structured JSON: 20 pkts pickle, 10kg haldi. Delivery landmark: Sonpur Chowk."},
        {"Time": "18:24:12", "Agent": "Fulfilment Agent", "Action": "FAIR_WORKLOAD_SPLIT", "Details": "Divided 20 pickle units equally between Sunita Devi and Meena Kumari to maintain workload balance."},
        {"Time": "18:24:15", "Agent": "Inventory Agent", "Action": "RAW_MATERIAL_RESERVE", "Details": "Reserved 2kg mustard oil & 50 glass jars. Triggered reorder prompt to Digital Saathi."},
        {"Time": "18:25:01", "Agent": "Suraksha Agent", "Action": "SAFE_ESCORT_START", "Details": "Active delivery trip initiated. Monitored along Sonpur-Kalyanpur corridor with 2 nearby youth responders."},
        {"Time": "18:42:19", "Agent": "Payment Agent", "Action": "LEDGER_SETTLEMENT", "Details": "Generated zero-dispute payout receipt with cryptographic trust hash 9A4C8E2F10B7D6A3."}
    ]
    
    st.table(pd.DataFrame(agent_logs))

with tab3:
    st.subheader("Suraksha Setu - Hyperlocal Safety Grid for Women Deliveries")
    
    scol1, scol2 = st.columns([1, 1])
    with scol1:
        st.markdown("""
        #### Why Traditional Maps Fail in Rural Areas:
        - Rural addresses don't have street names or door numbers.
        - SHG women often have low smartphone literacy (sharing live WhatsApp pins is difficult).
        - Rural internet drops frequently in fields and river belts.
        
        #### Shakti Setu's Zero-Map Landmark System:
        - **Audio-First SOS**: Activated by triple-pressing power button or speaking *"मदद"* / *"हे शक्ति"*.
        - **Landmark Geocoding**: Translates coordinates to *"Rampur mod ke paas peepal ped ke samne"*.
        - **Youth First Responders**: Registered rural Digital Saathis on bikes reach within 3-5 minutes.
        """)

    with scol2:
        st.success("🟢 Active Trip Status: SAFE | Sunita Devi (Battery: 88%)")
        st.markdown("**Current Landmark:** `Rampur Mod, Peepal Ped ke Saamne`")
        st.markdown("**Nearest Digital Saathi:** `Rahul Sharma (650m away, ETA 3 mins)`")
        st.markdown("**Backup Responder:** `Ramesh Kumar (Youth Volunteer, 1.1km)`")
        
        if st.button("🚨 Simulate Emergency SOS Broadcast"):
            st.error("🚨 CRITICAL ALERT TRIGGERED: Distress signal broadcasted to 2 Digital Saathis on bikes with landmark coordinates!")

with tab4:
    st.subheader("SHG Member Capacity & Cooperative Rotation")
    st.progress(65, text="Cluster Monthly Fulfilment Capacity (65% Utilized)")
    st.markdown("""
    The Fulfilment Agent prevents the **"Elite Capture"** problem (where only the group president gets all orders).
    Tasks are distributed using a round-robin skill-matched algorithm that ensures every member earns fairly.
    """)

st.caption("SHAKTI SETU AI • Developed for GAVS Hackathon (Tech4Bharat) • Theme: Youth and Women")
