output="["
index=0

for var in "$@"
do
    # some podspecs output with comments preceding the json data, we remove them using sed
    podSpec="$(pod ipc spec ${var} | sed -r '1,+6{/^[^{}[:space:]].+$/d;}')"
    output="$output $podSpec"
    index=$((index + 1))
    if [ $index -ne $# ]; then
      output="$output,"
    fi
done

output="$output]"
echo "$output" | tr -d '\n'
