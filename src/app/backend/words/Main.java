import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

/**
 * HOW TO USE
 * 1. Download a file from <a href="https://github.com/OpenTaal/opentaal-wordlist/blob/master/elements/basiswoorden-gekeurd.txt">source</a>
 * (whichever one suits your needs).
 * 2. Place it in this repository next to the file.
 * 3. Update constant {@code INPUT} with the name of the downloaded file.
 * 4. Check that the {@code OUTPUT} variable is as expected.
 * 5. Run the script using the command `java Main.java`.
 */
public class Main {
  private final static String INPUT = "woorden.txt";
  private final static String OUTPUT = "words.js";

  public static void main(String... args) throws IOException {
    BufferedWriter writer = new BufferedWriter(new FileWriter(OUTPUT));
    File input = new File(INPUT);
    if (!input.exists()) {
      throw new RuntimeException("Input file not found");
    }

    writer.write("export const WORDS = [");
    writer.newLine();

    //noinspection resource
    Files.lines(input.toPath())
      .filter(Main::onlyContainsLettersWithoutAccents)
      .filter(Main::is5Letters)
      // This for has side effects, which we normally don't want!
      // Just don't use parallel. Original list is sorted, and this way the output is also sorted.
      .forEach(s -> {
        try {
          writer.write("    '");
          writer.write(s);
          writer.write("',");
          writer.newLine();
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      });
    writer.write("]");
    writer.newLine();
    writer.flush();
  }

  private static Boolean onlyContainsLettersWithoutAccents(String s) {
    return s.matches("[a-z]+");
  }

  private static Boolean is5Letters(String s) {
    return s.length() == 5;
  }
}
