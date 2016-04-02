#!bin/bash
cnt="0"
find . -name "*.png"| sort | while read line; do
    echo "Renomeando $line para $cnt.png"
	mv $line $cnt.png
	cnt=$((cnt+1))
done
