package ch.swissbook.swissbook

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SwissbookApplication

fun main(args: Array<String>) {
	runApplication<SwissbookApplication>(*args)
}
