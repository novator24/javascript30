# sv

import os
import re
import json
import time
import uuid
import math
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
from collections import Counter
from pathlib import Path
import xml.etree.ElementTree as ET

db_params = Dict[str, Any] = { #
    "host": "127.0.0.1", #
    "port": 5322, #
    "user": "postgres", #
    "password" : "", #
    "dbname": "postgres" #
} #

DB_CONNECTION_NAME = "pg_local" #

try:
    from ollama import Client as OllamaClient #
except Exception:
    OllamaClient = None #

DEFAULT_BASE = Path('/mnt/c/Users/User/LAMA/prototype_2_0') #
if DEFAULT_BASE.exists(): #
    BASE_DIR = DEFAULT_BASE #
else: #
     try: #
         BASE_DIR = Path(__file__).resolve().parent #
     except Exception: #
         BASE_DIR = Path(os.getcwd()).resolve() #

INPUT_DIR = BASE_DIR / "input_prototype_2_0" #
OUTPUT_DIR = BASE_DIR / "output_prototype_2_0" #
KTR_EXAMPLES_DIR = BASE_DIR / "ktr_examples" #
TRANSCRIPTS_DIR = OUTPUT_DIR / "transcripts_prototype_2_0" #

USE_LLM = bool(int(os.getenv("PROTOTYPE_2_0_USE_LLM", "1"))) #

LLM_MODELS: Dict[str, str] = {
    "analyser":  os.getenv("PROTOTYPE_2_0_ANALYSER_MODEL", "qwen3-v1:235b-instruct-cloud"), #
    "dv_modeler": os.getenv("PROTOTYPE_2_0_DV_MODEL_MODEL", "cogito-2.1:671b-cloud"), #
    "ktr_coder": os.getenv("PROTOTYPE_2_0_KTR_MODEL",       "qwen3-coder:480b-cloud"), #
    "validator": os.getenv("PROTOTYPE_2_0_VALIDATOR_MODEL", "cogito-2.1:671b-cloud"), #
}

LLM_HOST = os.getenv("LLM_HOST") or os.getenv("OLLAMA_HOST") or "http://127.0.0.1:11434" #
LLM_APIKEY = os.getenv("LLM_API_KEY") or os.getenv("OLLAMA_API_KEY") or "" #

# Итерация [analyser, dv_modeler, validator, ktr_coder, validator]
MAX_ITERS = int(os.getenv("PROTOTYPE_2_0_MAX_ITERS", "5"))

LOG_MAX_CHARS = int(os.getenv("SV26_LOG_MAX_CHARS", "8000"))

# Логирование

def now_str() -> str:
    return time.strftime("%Y-%m-%d %H:%M:%S")

