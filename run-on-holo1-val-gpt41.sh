#!/bin/bash
set -euxo pipefail

echo "🚀 Starting Surfer H - Holo1 Model Run with GPT-4o Validation"
echo "=============================================================="

# Check for .env file and load environment variables
if [ -f ".env" ]; then
    echo "📄 Loading environment variables from .env file..."
    # Export variables from .env file (filter out comments)
    # export $(grep -v '^#' .env | xargs) # use this is you want to override existing variables

    while IFS='=' read -r key value; do
        # Skip empty lines and comments
        [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]] && continue
        # Only export if variable is not already set
        if [[ -n "$key" && -z "${!key:-}" ]]; then
            export "$key=$value"
        fi
    done < .env
else
    echo "⚠️  Warning: .env file not found"
    echo "   Please create a .env file with the following variables:"
    echo "   HAI_API_KEY=your_hai_api_key_here"
    echo "   HAI_MODEL_URL=https://<api-endpoint-url>/"
    echo "   OPENAI_API_KEY=your_openai_api_key_here"
    echo ""
fi

# Check required environment variables
echo "🔍 Checking required environment variables..."
MISSING_VARS=()

if [ -z "${HAI_API_KEY:-}" ]; then
    MISSING_VARS+=("HAI_API_KEY")
fi

if [ -z "${HAI_MODEL_URL:-}" ]; then
    MISSING_VARS+=("HAI_MODEL_URL")
fi

if [ -z "${OPENAI_API_KEY:-}" ]; then
    MISSING_VARS+=("OPENAI_API_KEY")
fi

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please set these variables in your .env file or export them directly:"
    echo "   HAI_API_KEY=your_hai_api_key_here"
    echo "   HAI_MODEL_URL=https://<api-endpoint-url>/"
    echo "   OPENAI_API_KEY=your_openai_api_key_here"
    echo ""
    echo "Or create a .env file with these variables."
    exit 1
fi

echo "✅ All required environment variables are set"

# Sync dependencies
echo "📦 Syncing dependencies..."
uv sync

# Set up API keys for the run
export API_KEY_LOCALIZATION=${HAI_API_KEY}
export API_KEY_NAVIGATION=${HAI_API_KEY}

# Model configuration
MODEL="${HAI_MODEL_NAME:-Hcompany/Holo1-7B}"
TASK="Find a beef Wellington recipe with a rating of 4.7 or higher and at least 200 reviews."
URL="https://www.allrecipes.com"

echo "🎯 Starting task: $TASK"
echo "🌐 Target URL: $URL"
echo "🤖 Model URL: $HAI_MODEL_URL"
echo "✅ Validation: GPT-4o enabled"
echo ""

# Run the surfer-h-cli command
uv run surfer-h-cli \
    --task "$TASK" \
    --url "$URL" \
    --max_n_steps 30 \
    --base_url_localization "$HAI_MODEL_URL" \
    --model_name_localization $MODEL \
    --temperature_localization 0.0 \
    --base_url_navigation "$HAI_MODEL_URL" \
    --model_name_navigation $MODEL \
    --temperature_navigation 0.7 \
    --use_validator \
    --model_name_validation gpt-4o-2024-08-06 \
    --temperature_validation 0.0 \
    "$@"
