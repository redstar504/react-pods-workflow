output="["
index=0

for var in "$@"
do
    podSpec=$(pod ipc spec ${var})
    output="${output} ${podSpec}"
    index=$((index + 1))
    if [ $index -ne $# ]; then
      output="${output},"
    fi
done

output="${output}]"

echo $output
