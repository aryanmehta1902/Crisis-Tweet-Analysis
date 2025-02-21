from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
hf_token = "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"

model_name = "meta-llama/Llama-2-7b"
tokenizer = AutoTokenizer.from_pretrained(model_name, token = hf_token)
model = AutoModelForCausalLM.from_pretrained(model_name, token = hf_token)
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
model = model.to(device)

prompt = "How are you doing?"
inputs = tokenizer(prompt, return_tensors= "pt").to(device)
outputs = model.generate(inputs.input_ids, max_length = 100, temperature = 0.7)
response = tokenizer.decode(outputs[0], skip_special_tokens= True)
print(response)